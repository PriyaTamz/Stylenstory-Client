import { useState } from 'react';
import ProductForm from './ProductForm';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const ProductTable = ({ products, onAdd, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (productId) => {
    // Add a confirmation dialog for better UX
    if (window.confirm('Are you sure you want to delete this product?')) {
        onDelete(productId);
    }
  };

  const handleFormSubmit = (productData) => {
    if (editingProduct) {
      onEdit({ ...productData, id: editingProduct.id });
    } else {
      onAdd(productData);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6 flex justify-between items-center border-b">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Manage Products</h2>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold text-sm rounded-md hover:bg-indigo-700 transition-colors"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Stock</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <img className="h-12 w-12 rounded-md object-cover" src={product.image} alt={product.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500 hidden lg:block">{product.description.substring(0, 40)}...</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">${product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(product)} className="text-indigo-600 hover:text-indigo-900 p-2">
                    <FiEdit className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900 p-2 ml-2">
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-full overflow-y-auto">
            <ProductForm 
              product={editingProduct} 
              onSubmit={handleFormSubmit} 
              onCancel={() => setIsModalOpen(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;