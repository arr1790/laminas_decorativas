'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

const Search = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      setQuery(''); // Limpiar el campo después de la búsqueda
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center bg-white shadow-md rounded-lg overflow-hidden"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar..."
        className="border-none p-1 w-64 focus:outline-none focus:ring-2 focus:ring-black-500"
      />
      <button
        type="submit"
        className="bg-black text-white p-2 flex items-center justify-center hover:bg-gray-800 transition duration-200"
      >
        <SearchIcon className="w-5 h-5" />
      </button>
    </form>
  );
};

export default Search;
