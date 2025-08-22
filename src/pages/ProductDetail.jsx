import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts, useCart } from "../context";
import axios from "axios";
import ProductCard from "../components/product/ProductCard";
import {
  FiShoppingCart,
  FiHeart,
  FiChevronLeft,
  FiLoader,
  FiAlertTriangle,
} from "react-icons/fi";
import authServices from "../service/authService";

const ProductDetail = () => {
  const { id } = useParams();
  const { getRelatedProducts } = useProducts();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");

  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      window.scrollTo(0, 0);
      try {
        setLoading(true);
        const response = await authServices.getProductById(id);
        const fetchedProduct = response.data;
        setProduct(fetchedProduct);

        if (fetchedProduct.images?.length > 0)
          setMainImage(fetchedProduct.images[0]);
        if (fetchedProduct.colors?.length > 0)
          setSelectedColor(fetchedProduct.colors[0]);
        if (fetchedProduct.size?.length > 0)
          setSelectedSize(fetchedProduct.size[0]);
      } catch (err) {
        setError("Product not found or an error occurred.");
        console.error("API Error in ProductDetail:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return getRelatedProducts(product._id, product.category).filter(
      (p) => p._id !== product._id
    );
  }, [product, getRelatedProducts]);

  const handleAddToCart = useCallback(async () => {
    if (!product || isAdding) return;
    setIsAdding(true);
    try {
      await addToCart(product, quantity, selectedSize, selectedColor);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    } finally {
      setIsAdding(false);
    }
  }, [product, isAdding, addToCart, quantity, selectedSize, selectedColor]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
        <FiLoader className="animate-spin text-5xl text-indigo-600" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12">
        <div className="container mx-auto px-4 text-center bg-white p-8 rounded-lg shadow-md max-w-lg">
          <FiAlertTriangle className="text-5xl text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-red-600">
            {error || "Product Not Found"}
          </h2>
          <p className="text-gray-600 mb-6">
            We're sorry, but the product you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/products"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
          >
            Explore All Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6 sm:py-8">
      {/* Container with max-width to control overall size on large screens */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/products"
          className="flex items-center text-indigo-600 mb-5 hover:underline font-medium text-sm"
        >
          <FiChevronLeft className="mr-1" /> Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Asymmetrical grid: 2 parts for image, 3 for details on large screens */}
          <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-x-8">
            {/* Image gallery column */}
            <div className="lg:col-span-2 p-4 sm:p-6">
              <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden mb-3 shadow-inner">
                <img
                  src={mainImage}
                  alt={product.title}
                  className="w-full h-full object-cover object-center transition-opacity duration-300"
                  loading="eager"
                />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    className={`aspect-square bg-gray-100 rounded-md overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      mainImage === img
                        ? "ring-2 ring-offset-2 ring-indigo-500"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => setMainImage(img)}
                  >
                    <img
                      src={img}
                      alt={`${product.title} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product info column */}
            <div className="lg:col-span-3 p-4 sm:p-6 flex flex-col justify-center">
              <div className="space-y-4">
                <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
                  {product.title}
                </h1>
                <p className="text-2xl tracking-tight text-gray-900">
                  ₹{product.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product.description}
                </p>

                {/* Colors */}
                <div>
                  <h3 className="text-xs font-medium text-gray-800 mb-2">
                    Color:{" "}
                    <span className="font-bold capitalize">{selectedColor}</span>
                  </h3>
                  <div className="flex items-center space-x-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`w-7 h-7 rounded-full border-2 transition-transform transform hover:scale-110 focus:outline-none ${
                          selectedColor === color
                            ? "ring-2 ring-offset-2 ring-indigo-500"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h3 className="text-xs font-medium text-gray-800 mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.size.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 border rounded-md text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                          selectedSize === s
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <h3 className="text-xs font-medium text-gray-800 mb-2">Quantity</h3>
                  <div className="flex items-center border border-gray-200 rounded-md w-28">
                    <button
                      className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-l-md transition-colors"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-medium text-sm text-gray-800" aria-live="polite">{quantity}</span>
                    <button
                      className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-r-md transition-colors"
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0 pt-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="flex-1 bg-indigo-600 text-white py-2.5 px-5 rounded-md text-sm font-semibold hover:bg-indigo-700 flex items-center justify-center transition-all duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                  >
                    {isAdding ? (
                      <FiLoader className="animate-spin mr-2" />
                    ) : (
                      <FiShoppingCart className="mr-2 h-4 w-4" />
                    )}
                    {isAdding ? "Adding..." : "Add to Cart"}
                  </button>
                  <button className="p-2.5 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 hover:text-red-500 transition-colors shadow-sm hover:shadow-md">
                    <FiHeart className="h-5 w-5" aria-label="Add to wishlist" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center sm:text-left">You may also like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-x-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;