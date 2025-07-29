import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

// A small component for the star rating to keep the main component cleaner
const StarRating = ({ rating, reviews }) => (
  <div className="flex items-center">
    <div className="flex text-yellow-500">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-4 h-4 fill-current ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
      ))}
    </div>
    <span className="text-gray-500 text-xs ml-2">({reviews} reviews)</span>
  </div>
);


const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  // Note: For simplicity, we add the first available color/size.
  // A real-world scenario might open a modal for selection or navigate to the product page.
  const [selectedColor] = useState(product.colors[0]);
  const [selectedSize] = useState(product.sizes[0]);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigating to product page when clicking "Add to Cart"
    e.stopPropagation(); // Stop the event from bubbling up further
    addToCart(product, 1, selectedSize, selectedColor);
    // Optional: Add feedback to the user, like changing the button text or showing a toast.
  };

  return (
    <div className="product-card group relative flex flex-col bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link to={`/product/${product.id}`} className="flex flex-col flex-grow">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[4/5] w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Wishlist Button - always visible but subtle */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Wishlist logic here
              console.log('Added to wishlist:', product.name);
            }}
            aria-label="Add to Wishlist"
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/70 backdrop-blur-sm text-gray-800 hover:bg-white hover:text-red-500 transition-colors"
          >
            <FiHeart />
          </button>
          
          {/* Product Tag (Optional) */}
          {product.tag && (
            <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {product.tag}
            </span>
          )}
        </div>

        {/* Product Info - flex-grow pushes the action button to the bottom */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-sm font-medium text-gray-500">{product.category || 'Category'}</h3>
          <h2 className="text-base font-semibold text-gray-900 truncate mt-1" title={product.name}>
            {product.name}
          </h2>

          <div className="mt-2 mb-4">
             <StarRating rating={product.rating} reviews={product.reviews} />
          </div>

          {/* Color Swatches - Visual cue */}
          <div className="flex items-center space-x-2 mb-4">
            {product.colors.slice(0, 4).map((color, index) => (
              <span 
                key={index}
                className="block w-5 h-5 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
            )}
          </div>
          
          {/* Price - Using mt-auto to push it to the bottom of this div */}
          <div className="mt-auto">
            <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
      
      {/* Add to Cart Button - Outside the Link to have its own dedicated action */}
      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-[#214b84] text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-gray-[#214b84] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
        >
          <FiShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;