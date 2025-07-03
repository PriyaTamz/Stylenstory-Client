import { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [allProducts] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [searchTerm, setSearchTerm] = useState('');

  const filterProducts = () => {
    let result = allProducts;

    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(result);
  };

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, priceRange, searchTerm]);

  const getProductById = id => allProducts.find(product => product.id === id);

  const getRelatedProducts = (currentProductId, category, limit = 4) => {
    return allProducts
      .filter(product => product.id !== currentProductId && product.category === category)
      .slice(0, limit);
  };

  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts,
        allProducts,
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
