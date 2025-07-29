import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Import axios directly here

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]); // Adjusted default max price
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all products from the API on initial load
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // API call is made directly here
        const response = await axios.get('http://localhost:5000/api/product');
        setAllProducts(response.data);
        setFilteredProducts(response.data); 
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error("API Error in ProductContext:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Effect to apply filters whenever dependencies change
  useEffect(() => {
    let result = allProducts;

    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category.includes(selectedCategory));
    }

    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (searchTerm) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [selectedCategory, priceRange, searchTerm, allProducts]);

  const getProductById = id => allProducts.find(product => product._id === id);

  const getRelatedProducts = (currentProductId, productCategories, limit = 4) => {
    if (!productCategories || productCategories.length === 0) return [];
    
    return allProducts
      .filter(product => 
        product._id !== currentProductId && 
        product.category.some(cat => productCategories.includes(cat))
      )
      .slice(0, limit);
  };

  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts,
        allProducts,
        loading,
        error,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        searchTerm,
        setSearchTerm,
        getProductById,
        getRelatedProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);