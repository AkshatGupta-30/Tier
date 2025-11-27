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
      className="w-full max-w-2xl"
    >
      <div className="relative group">
        <div className="absolute z-1 inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FcGoogle className="text-2xl" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          className="block w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
          placeholder={PLACEHOLDERS.SEARCH}
          autoFocus
        />
      </div>
    </form>
  );
};

export default SearchBar;
