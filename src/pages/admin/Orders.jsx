import React from 'react';
import OrderTable from '../../components/admin/OrderTable';

const Orders = () => {
  // Mock order data
  const orders = [
    { id: '12345', customer: { name: 'John Doe', email: 'john@example.com' }, date: '2023-05-15', amount: 59.99, status: 'Completed', items: [{ product: 'Classic White Tee', quantity: 1, price: '24.99' }, { product: 'Black Graphic Tee', quantity: 1, price: '29.99' }] },
    { id: '12346', customer: { name: 'Jane Smith', email: 'jane@example.com' }, date: '2023-05-14', amount: 79.98, status: 'Shipped', items: [{ product: 'Striped Polo Shirt', quantity: 2, price: '34.99' }] },
    { id: '12347', customer: { name: 'Robert Johnson', email: 'robert@example.com' }, date: '2023-05-14', amount: 39.99, status: 'Processing', items: [{ product: 'V-Neck Blouse', quantity: 1, price: '39.99' }] },
    { id: '12348', customer: { name: 'Emily Davis', email: 'emily@example.com' }, date: '2023-05-13', amount: 99.97, status: 'Completed', items: [{ product: 'Kids Cartoon Tee', quantity: 3, price: '19.99' }, { product: 'Classic White Tee', quantity: 1, price: '24.99' }] },
    { id: '12349', customer: { name: 'Michael Brown', email: 'michael@example.com' }, date: '2023-05-12', amount: 29.99, status: 'Cancelled', items: [{ product: 'Black Graphic Tee', quantity: 1, price: '29.99' }] }
  ];

  return <OrderTable orders={orders} />;
};

export default Orders;