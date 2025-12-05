import { useState, type FormEvent } from 'react';
import { FcGoogle } from 'react-icons/fc';

import { PLACEHOLDERS } from '@constants/label';
import useBookmarks from '@hooks/useBookmarks';
import { getGoogleSearchUrl } from '@utils';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { searchBookmarks } = useBookmarks();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = getGoogleSearchUrl(query);
    }
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setQuery(value);
    searchBookmarks(value);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full"
    >
      <div className="group relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-1 flex items-center pl-4">
          <FcGoogle className="text-2xl" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          className="block w-full rounded-full border border-white/20 bg-white/10 py-3 pr-4 pl-12 text-white placeholder-gray-400 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl focus:bg-white/20 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
          placeholder={PLACEHOLDERS.SEARCH}
          autoFocus
        />
      </div>
    </form>
  );
};

export default SearchBar;
