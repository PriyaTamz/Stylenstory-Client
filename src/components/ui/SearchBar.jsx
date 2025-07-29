import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ searchQuery, onSearch }) => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <FiSearch className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="search"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className="block w-full rounded-md border-gray-300 py-2 pl-10 pr-3 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;