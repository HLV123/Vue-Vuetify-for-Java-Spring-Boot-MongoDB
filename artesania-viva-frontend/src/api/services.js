import api from './index'

/* ===== AUTH SERVICE ===== */
export const authService = {
  login(credentials) {
    return api.post('/auth/login', credentials)
  },
  register(userData) {
    return api.post('/auth/register', userData)
  },
  logout() {
    return api.post('/auth/logout')
  },
  getProfile() {
    return api.get('/auth/profile')
  },
  updateProfile(data) {
    return api.put('/auth/profile', data)
  },
  changePassword(data) {
    return api.put('/auth/change-password', data)
  },
  forgotPassword(email) {
    return api.post('/auth/forgot-password', { email })
  },
  resetPassword(data) {
    return api.post('/auth/reset-password', data)
  }
}

/* ===== PRODUCT SERVICE ===== */
export const productService = {
  getAll(params = {}) {
    return api.get('/products', { params })
  },
  getById(id) {
    return api.get(`/products/${id}`)
  },
  search(params) {
    return api.get('/products/search', { params })
  },
  getByCategory(categoryId, params = {}) {
    return api.get(`/products/category/${categoryId}`, { params })
  },
  getByArtisan(artisanId, params = {}) {
    return api.get(`/products/artisan/${artisanId}`, { params })
  },
  getFeatured() {
    return api.get('/products/featured')
  },
  getNewArrivals(params = {}) {
    return api.get('/products/new-arrivals', { params })
  },
  create(productData) {
    return api.post('/products', productData)
  },
  update(id, productData) {
    return api.put(`/products/${id}`, productData)
  },
  delete(id) {
    return api.delete(`/products/${id}`)
  },
  uploadImages(id, formData) {
    return api.post(`/products/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  deleteImage(productId, imageId) {
    return api.delete(`/products/${productId}/images/${imageId}`)
  }
}

/* ===== CATEGORY SERVICE ===== */
export const categoryService = {
  getAll() {
    return api.get('/categories')
  },
  getById(id) {
    return api.get(`/categories/${id}`)
  },
  create(data) {
    return api.post('/categories', data)
  },
  update(id, data) {
    return api.put(`/categories/${id}`, data)
  },
  delete(id) {
    return api.delete(`/categories/${id}`)
  }
}

/* ===== ETHNIC GROUP SERVICE ===== */
export const ethnicService = {
  getAll() {
    return api.get('/ethnic-groups')
  },
  getById(id) {
    return api.get(`/ethnic-groups/${id}`)
  },
  create(data) {
    return api.post('/ethnic-groups', data)
  },
  update(id, data) {
    return api.put(`/ethnic-groups/${id}`, data)
  },
  delete(id) {
    return api.delete(`/ethnic-groups/${id}`)
  }
}

/* ===== CART SERVICE ===== */
export const cartService = {
  get() {
    return api.get('/cart')
  },
  addItem(productId, quantity = 1) {
    return api.post('/cart/items', { productId, quantity })
  },
  updateItem(itemId, quantity) {
    return api.put(`/cart/items/${itemId}`, { quantity })
  },
  removeItem(itemId) {
    return api.delete(`/cart/items/${itemId}`)
  },
  clear() {
    return api.delete('/cart')
  }
}

/* ===== ORDER SERVICE ===== */
export const orderService = {
  getAll(params = {}) {
    return api.get('/orders', { params })
  },
  getById(id) {
    return api.get(`/orders/${id}`)
  },
  create(orderData) {
    return api.post('/orders', orderData)
  },
  cancel(id, reason) {
    return api.put(`/orders/${id}/cancel`, { reason })
  },
  updateStatus(id, status) {
    return api.put(`/orders/${id}/status`, { status })
  },
  getByArtisan(params = {}) {
    return api.get('/orders/artisan', { params })
  },
  confirmOrder(id) {
    return api.put(`/orders/${id}/confirm`)
  },
  shipOrder(id, trackingData) {
    return api.put(`/orders/${id}/ship`, trackingData)
  }
}

/* ===== REVIEW SERVICE ===== */
export const reviewService = {
  getByProduct(productId, params = {}) {
    return api.get(`/reviews/product/${productId}`, { params })
  },
  create(reviewData) {
    return api.post('/reviews', reviewData)
  },
  update(id, reviewData) {
    return api.put(`/reviews/${id}`, reviewData)
  },
  delete(id) {
    return api.delete(`/reviews/${id}`)
  },
  getByArtisan(artisanId) {
    return api.get(`/reviews/artisan/${artisanId}`)
  }
}

/* ===== ARTISAN SERVICE ===== */
export const artisanService = {
  getAll(params = {}) {
    return api.get('/artisans', { params })
  },
  getById(id) {
    return api.get(`/artisans/${id}`)
  },
  getProfile() {
    return api.get('/artisans/profile')
  },
  updateProfile(data) {
    return api.put('/artisans/profile', data)
  },
  getDashboard() {
    return api.get('/artisans/dashboard')
  },
  getRevenue(params = {}) {
    return api.get('/artisans/revenue', { params })
  },
  register(data) {
    return api.post('/artisans/register', data)
  }
}

/* ===== CUSTOM ORDER SERVICE ===== */
export const customOrderService = {
  getAll(params = {}) {
    return api.get('/custom-orders', { params })
  },
  getById(id) {
    return api.get(`/custom-orders/${id}`)
  },
  create(data) {
    return api.post('/custom-orders', data)
  },
  respond(id, responseData) {
    return api.put(`/custom-orders/${id}/respond`, responseData)
  },
  accept(id) {
    return api.put(`/custom-orders/${id}/accept`)
  },
  reject(id, reason) {
    return api.put(`/custom-orders/${id}/reject`, { reason })
  }
}

/* ===== WISHLIST SERVICE ===== */
export const wishlistService = {
  get() {
    return api.get('/wishlist')
  },
  add(productId) {
    return api.post('/wishlist', { productId })
  },
  remove(productId) {
    return api.delete(`/wishlist/${productId}`)
  }
}

/* ===== PAYMENT SERVICE ===== */
export const paymentService = {
  createPayment(orderId, method) {
    return api.post('/payments', { orderId, method })
  },
  getPaymentStatus(paymentId) {
    return api.get(`/payments/${paymentId}`)
  },
  confirmPayment(paymentId, data) {
    return api.put(`/payments/${paymentId}/confirm`, data)
  }
}

/* ===== SHIPPING SERVICE ===== */
export const shippingService = {
  calculateFee(data) {
    return api.post('/shipping/calculate', data)
  },
  getProviders() {
    return api.get('/shipping/providers')
  },
  track(trackingNumber) {
    return api.get(`/shipping/track/${trackingNumber}`)
  }
}

/* ===== BLOG/STORY SERVICE ===== */
export const blogService = {
  getAll(params = {}) {
    return api.get('/blogs', { params })
  },
  getById(id) {
    return api.get(`/blogs/${id}`)
  },
  create(data) {
    return api.post('/blogs', data)
  },
  update(id, data) {
    return api.put(`/blogs/${id}`, data)
  },
  delete(id) {
    return api.delete(`/blogs/${id}`)
  }
}

/* ===== NOTIFICATION SERVICE ===== */
export const notificationService = {
  getAll(params = {}) {
    return api.get('/notifications', { params })
  },
  markAsRead(id) {
    return api.put(`/notifications/${id}/read`)
  },
  markAllAsRead() {
    return api.put('/notifications/read-all')
  },
  getUnreadCount() {
    return api.get('/notifications/unread-count')
  }
}

/* ===== ADMIN SERVICE ===== */
export const adminService = {
  getDashboard() {
    return api.get('/admin/dashboard')
  },
  getUsers(params = {}) {
    return api.get('/admin/users', { params })
  },
  updateUserStatus(userId, status) {
    return api.put(`/admin/users/${userId}/status`, { status })
  },
  getPendingProducts(params = {}) {
    return api.get('/admin/products/pending', { params })
  },
  approveProduct(productId) {
    return api.put(`/admin/products/${productId}/approve`)
  },
  rejectProduct(productId, reason) {
    return api.put(`/admin/products/${productId}/reject`, { reason })
  },
  getRevenueStats(params = {}) {
    return api.get('/admin/stats/revenue', { params })
  },
  getOrderStats(params = {}) {
    return api.get('/admin/stats/orders', { params })
  },
  getReports(params = {}) {
    return api.get('/admin/reports', { params })
  },
  resolveReport(reportId, action) {
    return api.put(`/admin/reports/${reportId}`, { action })
  },
  getPendingArtisans(params = {}) {
    return api.get('/admin/artisans/pending', { params })
  },
  approveArtisan(artisanId) {
    return api.put(`/admin/artisans/${artisanId}/approve`)
  },
  rejectArtisan(artisanId, reason) {
    return api.put(`/admin/artisans/${artisanId}/reject`, { reason })
  }
}

/* ===== COUPON SERVICE ===== */
export const couponService = {
  validate(code) {
    return api.post('/coupons/validate', { code })
  },
  getAll(params = {}) {
    return api.get('/coupons', { params })
  },
  create(data) {
    return api.post('/coupons', data)
  },
  update(id, data) {
    return api.put(`/coupons/${id}`, data)
  },
  delete(id) {
    return api.delete(`/coupons/${id}`)
  }
}

/* ===== ADDRESS SERVICE ===== */
export const addressService = {
  getAll() {
    return api.get('/addresses')
  },
  create(data) {
    return api.post('/addresses', data)
  },
  update(id, data) {
    return api.put(`/addresses/${id}`, data)
  },
  delete(id) {
    return api.delete(`/addresses/${id}`)
  },
  setDefault(id) {
    return api.put(`/addresses/${id}/default`)
  }
}
