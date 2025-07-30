import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProducts, useCart } from "../context";
import axios from "axios"; // Import axios directly here
import ProductCard from "../components/product/ProductCard";
import {
  FiShoppingCart,
  FiHeart,
  FiChevronLeft,
  FiLoader,
} from "react-icons/fi";

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

  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        // API call is made directly here
        const response = await axios.get(
          `http://localhost:5000/api/product/${id}`
        );
        const fetchedProduct = response.data;
        setProduct(fetchedProduct);

        // Set initial selections from the fetched product
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

  const relatedProducts = product
    ? getRelatedProducts(product._id, product.category)
    : [];

  const handleAddToCart = async () => {
    if (!product) return;

    // 1. Update cart in context
    addToCart(product, quantity, selectedSize, selectedColor);

    // 2. Optionally sync with backend
    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId: product._id,
          quantity,
          size: selectedSize,
          color: selectedColor,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Cart updated:", response.data);
    } catch (error) {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        console.warn("Unauthorized. Redirecting to login.");
        navigate("/auth");
      } else {
        console.error(
          "Add to cart failed:",
          error.response?.data || error.message
        );
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <FiLoader className="animate-spin text-5xl text-blue-600" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">
            {error || "Product not found"}
          </h2>
          <p className="text-gray-600">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Back to All Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link
          to="/products"
          className="flex items-center text-blue-600 mb-4 hover:underline"
        >
          <FiChevronLeft className="mr-1" /> Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Images */}
            <div>
              <div className="mb-4 h-96 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={mainImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    className={`h-20 bg-gray-100 rounded-md overflow-hidden ${
                      mainImage === img ? "ring-2 ring-blue-600" : ""
                    }`}
                    onClick={() => setMainImage(img)}
                  >
                    <img
                      src={img}
                      alt={`${product.title} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-2xl font-bold text-gray-900 mb-6">
                ₹{product.price.toFixed(2)}
              </p>
              <p className="text-gray-700 mb-8">{product.description}</p>

              {/* Colors */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Color:{" "}
                  <span className="font-bold capitalize">{selectedColor}</span>
                </h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 capitalize ${
                        selectedColor === color
                          ? "ring-2 ring-offset-2 ring-blue-600"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.size.map((s) => (
                    <button
                      key={s}
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === s
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 text-gray-800"
                      }`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Quantity
                </h3>
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

              {/* Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 flex items-center justify-center transition-all duration-300"
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
