import React from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/product/ProductCard';
import SearchBar from '../components/ui/SearchBar';
import CategoryFilter from '../components/ui/CategoryFilter';

const ProductListing = () => {
  const {
    products,
    allProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  } = useProducts();

  const categories = [...new Set(allProducts.map(p => p.category))];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">All Products</h1>

      <div className="max-w-md mx-auto mb-6">
        <SearchBar searchQuery={searchTerm} onSearch={setSearchTerm} />
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
