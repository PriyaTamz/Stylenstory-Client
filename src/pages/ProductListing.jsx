import React, { useState, useMemo, useCallback } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/product/ProductCard';
import SearchBar from '../components/ui/SearchBar';
import CategoryFilter from '../components/ui/CategoryFilter';
import { FiFilter, FiX, FiSearch, FiLoader, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// Performance: Wrap the component in React.memo to prevent re-renders if props don't change.
const FilterSection = React.memo(({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="border-b border-gray-200 py-6">
      <h3 className="-my-3 flow-root">
        <button
          type="button"
          className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-medium text-gray-900">{title}</span>
          <span className="ml-6 flex items-center">
            <FiChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </span>
        </button>
      </h3>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

const ProductListing = () => {
  const {
    products: filteredProducts,
    allProducts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  } = useProducts();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState('default');

  // Performance: Memoize categories so they are not recalculated on every render.
  const categories = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return ['all'];
    // Use a Set to efficiently get unique category strings.
    const uniqueCategories = [...new Set(allProducts.flatMap(p => p.category || []))];
    return ['all', ...uniqueCategories];
  }, [allProducts]);
  
  // Performance: Replace useEffect + useState for sorting with a single useMemo.
  // This avoids an extra render cycle and only recalculates when dependencies change.
  const sortedProducts = useMemo(() => {
    // Use toSorted() for an immutable sort, creating a new array.
    switch (sortOption) {
      case 'price-asc':
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...filteredProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return filteredProducts; // Return the original filtered array if no sort is applied.
    }
  }, [filteredProducts, sortOption]);

  // Performance: Memoize event handlers with useCallback.
  const handleCategorySelect = useCallback((category) => {
    setSelectedCategory(category);
    setMobileFiltersOpen(false); // Close panel on selection
  }, [setSelectedCategory]);

  const handleSortChange = useCallback((e) => {
    setSortOption(e.target.value);
  }, []);

  const toggleMobileFilters = useCallback(() => {
    setMobileFiltersOpen(open => !open);
  }, []);
  
  // Performance: Memoize the FilterPanel JSX to prevent re-creating it on every render.
  const filterPanelContent = useMemo(() => (
    <>
      <FilterSection title="Search">
        <SearchBar searchQuery={searchTerm} onSearch={setSearchTerm} />
      </FilterSection>
      <FilterSection title="Categories">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={handleCategorySelect}
        />
      </FilterSection>
    </>
  ), [searchTerm, setSearchTerm, categories, selectedCategory, handleCategorySelect]);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <FiLoader className="animate-spin text-4xl text-blue-600" />
        <span className="ml-4 text-xl">Loading Products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 px-4">
        <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
        <p className="text-gray-600 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Mobile filter dialog using framer-motion */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
              onClick={toggleMobileFilters}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-xs flex flex-col bg-white shadow-xl z-50"
            >
              <div className="flex items-center justify-between px-4 py-4 border-b">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 p-2 rounded-md text-gray-400 hover:text-gray-500"
                  onClick={toggleMobileFilters}
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>
              <div className="px-4 mt-2 overflow-y-auto">
                {filterPanelContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 flex items-baseline justify-between pt-12 pb-6 border-b border-gray-200">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">Our Collection</h1>

          <div className="flex items-center">
            <div className="relative inline-block text-left">
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="pl-3 pr-8 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <option value="default">Sort by</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            <button
              type="button"
              className="p-2 ml-4 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={toggleMobileFilters}
            >
              <FiFilter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">Products</h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
            {/* Desktop Filters */}
            <aside className="hidden lg:block">
              {filterPanelContent}
            </aside>

            {/* Product grid */}
            <div className="lg:col-span-3">
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
                  {sortedProducts.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center rounded-lg bg-gray-50">
                  <FiSearch className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800">No Products Found</h3>
                  <p className="mt-2 text-gray-500">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductListing;