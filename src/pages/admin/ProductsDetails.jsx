import { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import ProductTable from '../../components/admin/ProductTable';

const Products = () => {
  // Mock product data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Classic White Tee',
      description: 'Premium quality white t-shirt for everyday wear',
      price: '24.99',
      category: 'Men',
      stock: 100,
      image: 'https://m.media-amazon.com/images/I/61-jBuhtgZL._AC_UY1100_.jpg'
    },
    {
      id: 2,
      name: 'Black Graphic Tee',
      description: 'Cool black t-shirt with unique graphic print',
      price: '29.99',
      category: 'Women',
      stock: 75,
      image: 'https://m.media-amazon.com/images/I/71QN6pTW-WL._AC_UL1500_.jpg'
    },
    {
      id: 3,
      name: 'Striped Polo Shirt',
      description: 'Comfortable striped polo shirt for casual occasions',
      price: '34.99',
      category: 'Men',
      stock: 50,
      image: 'https://m.media-amazon.com/images/I/71+Q4VQ5YIL._AC_UL1500_.jpg'
    },
    {
      id: 4,
      name: 'V-Neck Blouse',
      description: 'Elegant v-neck blouse for women',
      price: '39.99',
      category: 'Women',
      stock: 60,
      image: 'https://m.media-amazon.com/images/I/61+6mQJBnGL._AC_UL1500_.jpg'
    },
    {
      id: 5,
      name: 'Kids Cartoon Tee',
      description: 'Fun cartoon printed t-shirt for kids',
      price: '19.99',
      category: 'Kids',
      stock: 120,
      image: 'https://m.media-amazon.com/images/I/71QN6pTW-WL._AC_UL1500_.jpg'
    }
  ]);

  const handleEditProduct = (updatedProduct) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
  };

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:ml-64">
          <ProductTable 
            products={products} 
            onEdit={handleEditProduct} 
            onDelete={handleDeleteProduct} 
            onAdd={handleAddProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;