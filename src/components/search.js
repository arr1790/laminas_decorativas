'use client';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

const Search = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex items-center max-w-xs"
    >
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar..."
        className="w-full py-1 pl-3 pr-8 text-sm border-b border-gray-300 focus:outline-none focus:border-black transition-colors"
      />
      <button
        type="submit"
        className="absolute right-1 text-gray-500 hover:text-black transition-colors"
        aria-label="Buscar"
      >
        <SearchIcon className="w-4 h-4" />
      </button>
    </form>
  );
};

export default Search;
