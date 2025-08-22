import instance from "./instance";

const authServices = {
  getUserOrders: async () => {
    return await instance.get("/api/order/user-order", {
      withCredentials: true,
    });
  },
  requestReturn: async ({ orderId, productId, reason }) => {
    return await instance.post("/api/order/return", {
      orderId,
      productId,
      reason,
    });
  },
  getProductById: async (id) => {
    return await instance.get(`/api/product/${id}`);
  },
  checkout: async ({ addressId, method }) => {
    return await instance.post("/api/order/checkout", { addressId, method });
  },
  verifyPayment: async ({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderId,
  }) => {
    return await instance.post("/api/order/verify", {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    });
  },
  refundOrder: async ({ orderId, paymentId, amount }) => {
    return await instance.post("/api/order/admin/refund", {
      orderId,
      paymentId,
      amount,
    });
  },
  getProducts: async () => {
    return await instance.get("/api/product");
  },
  createProduct: async (data) => {
    return await instance.post("/api/product/create", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  updateProduct: async (id, data) => {
    return await instance.put(`/api/product/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  deleteProduct: async (id) => {
    return await instance.delete(`/api/product/${id}`);
  },
  getAddresses: async () => {
    return await instance.get("/api/address", { withCredentials: true });
  },
  addAddress: async (addressData) => {
    return await instance.post("/api/address", addressData, {
      withCredentials: true,
    });
  },
  deleteAddress: async (addressId) => {
    return await instance.delete(`/api/address/${addressId}`, {
      withCredentials: true,
    });
  },
  getCart: async () => {
    return await instance.get("/api/cart", { withCredentials: true });
  },
  addToCart: async ({ productId, quantity, size, color }) => {
    return await instance.post(
      "/api/cart/add",
      { productId, quantity, size, color },
      { withCredentials: true }
    );
  },
  removeFromCart: async ({ productId, size, color }) => {
    return await instance.post(
      "/api/cart/remove",
      { productId, size, color },
      { withCredentials: true }
    );
  },
  updateQuantity: async ({ productId, size, color, quantity }) => {
    return await instance.put(
      "/api/cart/update",
      { productId, size, color, quantity },
      { withCredentials: true }
    );
  },
  clearCart: async () => {
    return await instance.delete("/api/cart/clear", { withCredentials: true });
  },
  saveAddress: async (shippingInfo, token) => {
    return await instance.post("/api/address", shippingInfo, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteAddress: async (id, token) => {
    return await instance.delete(`/api/address/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAllOrders: async () => {
    return await instance.get("/api/order/admin/orders", {
      withCredentials: true,
    });
  },
  refundAdmin: async ({ orderId }) => {
    return await instance.post(
      "/api/order/admin/refund",
      { orderId },
      { withCredentials: true }
    );
  },
  getAllUsersData: async () => {
    return await instance.get("/api/order/admin/all-usersData", {
      withCredentials: true,
    });
  },
};

export default authServices;
