import React from 'react';

const CategoryFilter = ({ categories, selected, onSelect }) => {
  return (
    <div className="mb-6">
      <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
        Filter by Category
      </label>
      <div className="relative">
        <select
          id="category-filter"
          value={selected}
          onChange={(e) => onSelect(e.target.value)}
          className="block w-full px-4 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategoryFilter;