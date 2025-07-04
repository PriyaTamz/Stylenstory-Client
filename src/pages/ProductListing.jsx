import React from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/product/ProductCard';
import SearchBar from '../components/ui/SearchBar';
import CategoryFilter from '../components/ui/CategoryFilter';
import { FiFilter, FiX, FiSearch } from 'react-icons/fi';

const ProductListing = () => {
  const {
    products,
    allProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  } = useProducts();

  const categories = ['all', ...new Set(allProducts.map(p => p.category))];
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile filter dialog */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-400"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-4 px-4">
              <SearchBar searchQuery={searchTerm} onSearch={setSearchTerm} />
              <CategoryFilter
                categories={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-8 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Our Products</h1>

          <div className="flex items-center">
            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <FiFilter className="h-5 w-5" />
              <span className="sr-only">Filters</span>
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Desktop Filters */}
            <div className="hidden lg:block">
              <div className="sticky top-6 space-y-6">
                <SearchBar searchQuery={searchTerm} onSearch={setSearchTerm} />
                <CategoryFilter
                  categories={categories}
                  selected={selectedCategory}
                  onSelect={setSelectedCategory}
                />
              </div>
            </div>

            {/* Product grid */}
            <div className="lg:col-span-3">
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <FiSearch className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter to find what you're looking for.
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