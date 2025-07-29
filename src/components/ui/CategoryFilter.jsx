import React from 'react';

const CategoryFilter = ({ categories, selected, onSelect }) => {
  return (
    <div className="space-y-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors duration-200 capitalize ${
            selected === cat
              ? 'bg-blue-600 text-white font-semibold shadow'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          {cat === 'all' ? 'All Categories' : cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;