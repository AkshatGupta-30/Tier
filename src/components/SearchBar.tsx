import { useState, useEffect, useRef, type FormEvent } from 'react';
import { FaMicrophoneLines, FaMagnifyingGlass } from 'react-icons/fa6';

import { PLACEHOLDERS } from '@constants/label';
import { SEARCH_ENGINES } from '@constants/search';
import useBookmarks from '@hooks/useBookmarks';
import { useAppSelector } from '@store';
import { getSearchUrl } from '@utils';
import { fetchSuggestions } from '@utils/suggestions';

import EngineSuggestion from './EngineSuggestion';
import BookmarkSuggestion from './BookmarkSuggestion';
import useDebounce from '@hooks/useDebounce';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [querySuggestions, setQuerySuggestions] = useState<string[]>([]);
  const [bookmarkSuggestions, setBookmarkSuggestions] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const selectedEngine = useAppSelector((state) => state.search.selectedEngine);
  const SearchIcon = SEARCH_ENGINES[selectedEngine].ICON;
  const { NAME: engineName } = SEARCH_ENGINES[selectedEngine];

  const { searchBookmarks } = useBookmarks();
  const [navigateTo, setNavigateTo] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [isListening, setIsListening] = useState(false);

  const { debouncedValue } = useDebounce(query);

  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (navigateTo) {
      window.location.href = navigateTo;
      setNavigateTo(null);
    }
  }, [navigateTo]);

  useEffect(() => {
    if (query.trim().length > 0) {
      new Promise<chrome.bookmarks.BookmarkTreeNode[]>((resolve) => {
        resolve(searchBookmarks(query));
      }).then((bookmarkResults) => {
        setBookmarkSuggestions(
          bookmarkResults.slice(0, 20).map((b) => ({ ...b, type: 'bookmark' as const })),
        );
        setShowSuggestions(true);
      });

      new Promise<string[]>((resolve) => {
        resolve(fetchSuggestions(query, selectedEngine));
      }).then((searchResults) => {
        setQuerySuggestions(searchResults.slice(0, 6));
        setShowSuggestions(true);
      });
    } else {
      setQuerySuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedValue, selectedEngine]);

  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice search is not supported in this browser.');
      return;
    }

    if (isListening) {
      stopRecognition();
      return;
    }

    setIsListening(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition = new (window as any).webkitSpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      // Removed auto-navigation for voice search as per request
      stopRecognition();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      stopRecognition();
    };

    recognition.onend = () => {
      stopRecognition();
    };

    try {
      recognition.start();
    } catch (e) {
      console.error(e);
      stopRecognition();
    }
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setNavigateTo(getSearchUrl(query, selectedEngine));
    }
  };

  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setQuery(value);
  };

  const handleSuggestionClick = (suggestion: string, type: 'bookmark' | 'search') => {
    if (type === 'bookmark') {
      if (suggestion) {
        setNavigateTo(suggestion);
      }
    } else {
      setNavigateTo(getSearchUrl(suggestion, selectedEngine));
    }
    setShowSuggestions(false);
  };

  const handleFillQuery = (e: React.MouseEvent, suggestion: string) => {
    e.stopPropagation();
    setQuery(suggestion);
    // Keep focus on input if possible, or just update the query
  };

  return (
    <div
      className="relative w-full"
      ref={searchRef}
    >
      <form
        onSubmit={handleSearch}
        className="w-full"
      >
        <div className="group relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-1 flex items-center pl-4">
            <img
              src={SearchIcon}
              alt={engineName}
              className="h-6 w-6"
            />
          </div>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={() => query.trim().length > 0 && setShowSuggestions(true)}
            className={`block w-full rounded-2xl border border-white/20 bg-white/10 py-3 pr-24 pl-12 text-white placeholder-gray-400 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl focus:bg-black/95 focus:ring-2 focus:ring-blue-500/50 focus:outline-none ${
              showSuggestions && querySuggestions.length > 0 ? 'rounded-b-none' : ''
            }`}
            placeholder={PLACEHOLDERS.SEARCH}
            autoFocus
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`flex cursor-pointer items-center p-2 transition-colors duration-200 ${
                isListening ? 'animate-pulse text-red-500' : 'text-gray-400 hover:text-white'
              }`}
              title="Search by voice"
            >
              <FaMicrophoneLines className="h-5 w-5" />
            </button>
            <div className="mx-1 h-6 w-px bg-white/20"></div>
            <button
              type="submit"
              className="flex cursor-pointer items-center p-2 text-gray-400 transition-colors duration-200 hover:text-white"
              title="Search"
            >
              <FaMagnifyingGlass className="h-5 w-5" />
            </button>
          </div>
        </div>
      </form>

      {showSuggestions && (
        <div className="absolute top-full left-0 z-50 w-full overflow-hidden rounded-b-2xl border-t border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col">
            {/* Bookmarks Section - Horizontal */}
            {bookmarkSuggestions.length > 0 && (
              <div className="flex max-h-[104px] w-full flex-row flex-wrap gap-2 overflow-hidden border-b border-white/10 p-2">
                {bookmarkSuggestions.map((suggestion, index) => (
                  <BookmarkSuggestion
                    key={`bookmark-${index}`}
                    suggestion={suggestion}
                    handleSuggestionClick={handleSuggestionClick}
                  />
                ))}
              </div>
            )}
            <ul className="flex flex-col py-1">
              {querySuggestions.map((suggestion, index) => (
                <EngineSuggestion
                  key={`search-${index}`}
                  query={query}
                  suggestion={suggestion}
                  engineIcon={SearchIcon}
                  engineName={engineName}
                  handleFillQuery={handleFillQuery}
                  handleSuggestionClick={handleSuggestionClick}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
