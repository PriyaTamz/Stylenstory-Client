import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const defaultSize = product.size?.[0] || 'M';
  const defaultColor = product.colors?.[0] || 'Default';

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    addToCart(product, 1, defaultSize, defaultColor);
  };

  if (!product) return null;

  return (
    <div className="product-card group relative flex flex-col bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link to={`/product/${product._id}`} className="flex flex-col flex-grow">
        <div className="relative overflow-hidden aspect-[4/5] w-full">
          <img
            src={product.images?.[0] || 'https://via.placeholder.com/400x500.png?text=No+Image'}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Added to wishlist:', product.title);
            }}
            aria-label="Add to Wishlist"
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/70 backdrop-blur-sm text-gray-800 hover:bg-white hover:text-red-500 transition-colors"
          >
            <FiHeart />
          </button>
          
          {product.tags?.[0] && (
            <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2.5 py-1 rounded-full capitalize">
              {product.tags[0]}
            </span>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-sm font-medium text-gray-500 capitalize">{product.category?.[0] || 'Uncategorized'}</h3>
          <h2 className="text-base font-semibold text-gray-900 truncate mt-1" title={product.title}>
            {product.title}
          </h2>

          <div className="flex items-center space-x-2 my-4">
            {product.colors?.slice(0, 4).map((color, index) => (
              <span 
                key={index}
                className="block w-5 h-5 rounded-full border border-gray-300"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
            {product.colors?.length > 4 && (
              <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
            )}
          </div>
          
          <div className="mt-auto">
            <span className="text-xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
          </div>
        </div>
      </Link>
      
      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-[#214b84] text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-[#1a3a69] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
        >
          <FiShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;