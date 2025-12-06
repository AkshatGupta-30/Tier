import { useState, useEffect, useRef, type FormEvent } from 'react';

import { useAppSelector } from '@store';
import { PLACEHOLDERS } from '@constants/label';
import useBookmarks from '@hooks/useBookmarks';
import { getSearchUrl } from '@utils';
import { SEARCH_ENGINES } from '@constants/search';
import { fetchSuggestions } from '@utils/suggestions';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [querySuggestions, setQuerySuggestions] = useState<string[]>([]);
  const [bookmarkSuggestions, setBookmarkSuggestions] = useState<chrome.bookmarks.BookmarkTreeNode[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const selectedEngine = useAppSelector((state) => state.search.selectedEngine);
  const SearchIcon = SEARCH_ENGINES[selectedEngine].ICON;
  const { NAME: engineName } = SEARCH_ENGINES[selectedEngine];

  const { searchBookmarks } = useBookmarks();
  const [navigateTo, setNavigateTo] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

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

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setNavigateTo(getSearchUrl(query, selectedEngine));
    }
  };

  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setQuery(value);

    if (value.trim().length > 0) {

      new Promise<chrome.bookmarks.BookmarkTreeNode[]>((resolve) => {
          resolve(searchBookmarks(value));
      }).then((bookmarkResults) => {
        setBookmarkSuggestions(bookmarkResults.slice(0, 20).map((b) => ({ ...b, type: 'bookmark' as const })));
        setShowSuggestions(true);
      })

      new Promise<string[]>((resolve) => {
          resolve(fetchSuggestions(value, selectedEngine));
      }).then((searchResults) => {
        setQuerySuggestions(searchResults.slice(0, 6));
        setShowSuggestions(true);
      })
    } else {
      setQuerySuggestions([]);
      setShowSuggestions(false);
    }
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
            className={`block w-full rounded-2xl border border-white/20 bg-white/10 py-3 pr-4 pl-12 text-white placeholder-gray-400 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl focus:bg-black/95 focus:ring-2 focus:ring-blue-500/50 focus:outline-none ${
              showSuggestions && querySuggestions.length > 0 ? 'rounded-b-none' : ''
            }`}
            placeholder={PLACEHOLDERS.SEARCH}
            autoFocus
          />
        </div>
      </form>

      {showSuggestions && (
        <div className="absolute top-full left-0 z-50 w-full overflow-hidden rounded-b-2xl border-t border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col">
            {/* Bookmarks Section - Horizontal */}
            {bookmarkSuggestions.length > 0 && (
              <div className="flex max-h-[104px] w-full flex-row flex-wrap gap-2 overflow-hidden border-b border-white/10 p-2">
                {bookmarkSuggestions
                  .map((suggestion, index) => (
                    <div
                      key={`bookmark-${index}`}
                      onClick={() => handleSuggestionClick(suggestion.url ?? "", 'bookmark')}
                      className="flex max-w-[150px] shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-white transition-colors hover:bg-white/10"
                      title={suggestion.title}
                    >
                      <span className="shrink-0 text-base">⭐</span>
                      <span className="truncate text-xs font-medium">{suggestion.title}</span>
                    </div>
                  ))}
              </div>
            )}

            {/* Search Suggestions Section - Vertical */}
            <ul className="flex flex-col py-1">
              {querySuggestions
                .map((suggestion, index) => (
                  <li
                    key={`search-${index}`}
                    onClick={() => handleSuggestionClick(suggestion, 'search')}
                    className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-white transition-colors hover:bg-white/10"
                  >
                    <img
                      src={SearchIcon}
                      alt={engineName}
                      className="h-4 w-4"
                    />
                    <span className="truncate text-sm font-medium">{suggestion}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
