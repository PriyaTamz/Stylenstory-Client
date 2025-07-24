import { useState } from 'react';
import ProductTable from '../../components/admin/ProductTable';

const ProductsDetails = () => {
  // Mock product data - you can replace this with data from your context or API
  const [products, setProducts] = useState([
    { id: 1, name: 'Classic White Tee', description: 'A classic tee for a reason. Made from 100% premium cotton.', price: 24.99, category: 'Men', stock: 100, image: 'https://m.media-amazon.com/images/I/61-jBuhtgZL._AC_UY1100_.jpg' },
    { id: 2, name: 'Black Graphic Tee', description: 'Stand out with this unique graphic tee.', price: 29.99, category: 'Women', stock: 75, image: 'https://m.media-amazon.com/images/I/71QN6pTW-WL._AC_UL1500_.jpg' },
    { id: 3, name: 'Striped Polo Shirt', description: 'Smart and casual, this polo is a wardrobe staple.', price: 34.99, category: 'Men', stock: 50, image: 'https://m.media-amazon.com/images/I/71+Q4VQ5YIL._AC_UL1500_.jpg' },
    { id: 4, name: 'V-Neck Blouse', description: 'Elegant and versatile, perfect for work or weekend.', price: 39.99, category: 'Women', stock: 60, image: 'https://m.media-amazon.com/images/I/61+6mQJBnGL._AC_UL1500_.jpg' },
    { id: 5, name: 'Kids Cartoon Tee', description: 'Fun and comfy, your kids will love it.', price: 19.99, category: 'Kids', stock: 120, image: 'https://m.media-amazon.com/images/I/71QN6pTW-WL._AC_UL1500_.jpg' }
  ]);

  // CRUD handlers (these would typically call an API)
  const handleEditProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]); // Use timestamp for unique ID
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <ProductTable 
      products={products} 
      onEdit={handleEditProduct} 
      onDelete={handleDeleteProduct} 
      onAdd={handleAddProduct}
    />
  );
};

export default ProductsDetails;