import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1, selectedSize, selectedColor);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card group block bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Image with aspect ratio */}
      <div className="relative overflow-hidden aspect-[4/5] bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="product-actions absolute bottom-0 left-0 right-0 bg-white/90 p-3 flex justify-between opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              // Wishlist functionality placeholder
            }}
          >
            <FiHeart className="text-gray-700" />
          </button>
          <button
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
            onClick={handleAddToCart}
          >
            <FiShoppingCart className="text-gray-700 cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-gray-900">{product.name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 text-sm">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(product.rating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-gray-500 text-sm ml-2">({product.reviews})</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
