import { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = ({ product, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    size: [],
    colors: [],
    tags: [],
    images: [],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        category: product.category || "",
        size: product.size || [],
        colors: product.colors || [],
        tags: product.tags || [],
        images: [], // Don't preload images, let user re-upload if needed
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("category", formData.category);
    formData.size.forEach((s) => data.append("size[]", s));
    formData.colors.forEach((c) => data.append("colors[]", c));
    formData.tags.forEach((t) => data.append("tags[]", t));
    formData.images.forEach((file) => data.append("images", file));

    try {
      let response;
      if (product) {
        // Editing existing product
        response = await axios.put(
          `http://localhost:5000/api/product/${product._id}`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        alert("✅ Product updated successfully!");
      } else {
        // Creating new product
        response = await axios.post(
          "http://localhost:5000/api/product/create",
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        alert("✅ Product added successfully!");
      }

      console.log("Product:", response.data.product);

      // Reset the form
      setFormData({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        size: [],
        colors: [],
        tags: [],
        images: [],
      });
    } catch (err) {
      console.error("Upload Error:", err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-2xl">
      <h2 className="text-3xl font-semibold text-gray-900 mb-8">
        {product ? "Edit Product" : "Add New Product"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-1"
          >
            Product Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-1"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-gray-700 font-medium mb-1"
            >
              Price (₹)
            </label>
            <input
              type="number"
              step="0.01"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Stock */}
          <div>
            <label
              htmlFor="stock"
              className="block text-gray-700 font-medium mb-1"
            >
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock"
              id="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium mb-1"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select Category</option>
              <option value="Regular T-shirt">Regular T-shirt</option>
              <option value="Oversized T-shirt">Oversized T-shirt</option>
              <option value="Polo T-shirt">Polo T-shirt</option>
              <option value="Full Sleeves">Full Sleeves</option>
              <option value="Hoodie">Hoodie</option>
            </select>
          </div>

          {/* Size Multi-Select */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select Sizes
            </label>
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL", "XXL"].map((size) => {
                const isSelected = formData.size.includes(size);

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        size: isSelected
                          ? prev.size.filter((s) => s !== size) // remove if selected
                          : [...prev.size, size], // add if not selected
                      }));
                    }}
                    className={`px-4 py-2 rounded-full border transition font-medium ${
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label
              htmlFor="colors"
              className="block text-gray-700 font-medium mb-1"
            >
              Colors (comma-separated)
            </label>
            <input
              type="text"
              name="colors"
              value={formData.colors.join(",")}
              onChange={(e) =>
                setFormData({ ...formData, colors: e.target.value.split(",") })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor="tags"
              className="block text-gray-700 font-medium mb-1"
            >
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags.join(",")}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value.split(",") })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Upload Images
            </label>

            <div className="relative">
              <label
                htmlFor="image-upload"
                className="cursor-pointer inline-block bg-gray-200 text-gray-800 text-center px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Choose File
              </label>
              <input
                id="image-upload"
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    images: Array.from(e.target.files),
                  })
                }
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {product ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
