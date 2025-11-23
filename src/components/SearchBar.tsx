import { useState, type FormEvent } from 'react';

import { PLACEHOLDERS } from '@constants/label';
import { getGoogleSearchUrl } from '@utils';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = getGoogleSearchUrl(query);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-2xl"
    >
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
          placeholder={PLACEHOLDERS.SEARCH}
          autoFocus
        />
      </div>
    </form>
  );
};

export default SearchBar;
