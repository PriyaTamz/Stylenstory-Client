import { useParams } from 'react-router-dom';
import { useProducts, useCart } from '../context';
import { useState } from 'react';


import { FiShoppingCart, FiHeart, FiStar, FiChevronLeft } from 'react-icons/fi';

const ProductDetail = () => {
  const { id } = useParams();
  const { getProductById, getRelatedProducts } = useProducts();
  const { addToCart } = useCart();
  const product = getProductById(parseInt(id));
  
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.image || '');
  
  const relatedProducts = product ? getRelatedProducts(product.id, product.category) : [];

  if (!product) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <p className="text-gray-600">
            The product you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <a href="/products" className="flex items-center text-primary mb-4">
          <FiChevronLeft className="mr-1" /> Back to Products
        </a>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div>
              <div className="mb-4 h-96 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={mainImage} 
                  alt={product.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[product.image, ...(product.additionalImages || [])].map((img, index) => (
                  <button 
                    key={index}
                    className={`h-20 bg-gray-100 rounded-md overflow-hidden ${mainImage === img ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setMainImage(img)}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} ${index + 1}`} 
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                    />
                  ))}
                </div>
                <span className="text-gray-500">
                  {product.rating.toFixed(1)} ({product.reviews} reviews)
                </span>
              </div>
              
              <p className="text-2xl font-bold text-gray-900 mb-6">
                ${product.price.toFixed(2)}
              </p>
              
              <p className="text-gray-700 mb-8">{product.description}</p>
              
              {/* Color Selector */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                <div className="flex space-x-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-primary' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              
              {/* Size Selector */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`px-4 py-2 border rounded-md ${selectedSize === size ? 'bg-primary text-white border-primary' : 'border-gray-300'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center border border-gray-300 rounded-md w-32">
                  <button
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center">{quantity}</span>
                  <button
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-white py-3 px-6 rounded-md font-medium hover:bg-secondary flex items-center justify-center"
                >
                  <FiShoppingCart className="mr-2" />
                  Add to Cart
                </button>
                <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-100">
                  <FiHeart />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;