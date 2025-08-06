import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

// Performance: A small, memoized component to handle just the color swatches.
// This prevents the mapping logic from running if only other parts of the card update.
const ColorSwatches = React.memo(({ colors }) => {
  if (!colors || colors.length === 0) {
    return null; // Don't render anything if there are no colors
  }

  const visibleColors = colors.slice(0, 4);
  const remainingCount = colors.length - 4;

  return (
    <div className="flex items-center space-x-2 my-4 h-5">
      {visibleColors.map((color) => (
        <span
          key={color}
          className="block w-5 h-5 rounded-full border border-gray-300"
          style={{ backgroundColor: color.toLowerCase() }}
          title={color}
        />
      ))}
      {remainingCount > 0 && (
        <span className="text-xs text-gray-500">+{remainingCount}</span>
      )}
    </div>
  );
});

// Performance: Wrap the entire component in React.memo.
// It will only re-render if the `product` prop has actually changed.
const ProductCard = React.memo(({ product }) => {
  const { addToCart } = useCart();
  
  // Performance: useMemo to calculate derived values only when the product changes.
  const { imageUrl, defaultSize, defaultColor, categoryName } = useMemo(() => {
    return {
      imageUrl: product.images?.[0] || `https://via.placeholder.com/400x500.png?text=${encodeURIComponent(product.title)}`,
      defaultSize: product.size?.[0] || 'M',
      defaultColor: product.colors?.[0] || 'Default',
      categoryName: product.category?.[0] || 'Uncategorized',
    };
  }, [product]);

  // Performance: useCallback to memoize the event handler function.
  // This prevents the function from being re-created on every render.
  const handleAddToCart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, defaultSize, defaultColor);
  }, [addToCart, product, defaultSize, defaultColor]);
  
  const handleAddToWishlist = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Added to wishlist:', product.title);
  }, [product.title]);


  if (!product) return null;

  return (
    <div className="product-card group relative flex flex-col bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link to={`/product/${product._id}`} className="flex flex-col flex-grow">
        <div className="relative overflow-hidden aspect-[4/5] w-full">
          {/* Performance: Added lazy loading and async decoding for images */}
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
          <button
            onClick={handleAddToWishlist}
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
          <h3 className="text-sm font-medium text-gray-500 capitalize">{categoryName}</h3>
          <h2 className="text-base font-semibold text-gray-900 truncate mt-1" title={product.title}>
            {product.title}
          </h2>

          <ColorSwatches colors={product.colors} />
          
          <div className="mt-auto">
            <span className="text-xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
          </div>
        </div>
      </Link>
      
      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-[#214b84] text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-[#1a3a69] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
        >
          <FiShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
});

export default ProductCard;   