import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ searchQuery, onSearch }) => {
  return (
    <div className="border-b border-gray-200 py-6">
      <h3 className="-my-3 flow-root">
        <div className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
          <span className="font-medium text-gray-900">Search</span>
        </div>
      </h3>
      <div className="pt-6">
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;