import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  // ===== PUBLIC / CUSTOMER ROUTES =====
  {
    path: '/',
    component: () => import('@/views/customer/CustomerLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/customer/HomePage.vue'),
        meta: { title: 'Trang Chủ' }
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/customer/ProductsPage.vue'),
        meta: { title: 'Sản Phẩm' }
      },
      {
        path: 'products/:id',
        name: 'ProductDetail',
        component: () => import('@/views/customer/ProductDetailPage.vue'),
        meta: { title: 'Chi Tiết Sản Phẩm' }
      },
      {
        path: 'category/:slug',
        name: 'Category',
        component: () => import('@/views/customer/ProductsPage.vue'),
        meta: { title: 'Danh Mục' }
      },
      {
        path: 'artisans',
        name: 'Artisans',
        component: () => import('@/views/customer/ArtisansPage.vue'),
        meta: { title: 'Nghệ Nhân' }
      },
      {
        path: 'artisans/:id',
        name: 'ArtisanProfile',
        component: () => import('@/views/customer/ArtisanProfilePage.vue'),
        meta: { title: 'Hồ Sơ Nghệ Nhân' }
      },
      {
        path: 'stories',
        name: 'Stories',
        component: () => import('@/views/customer/StoriesPage.vue'),
        meta: { title: 'Câu Chuyện Văn Hóa' }
      },
      {
        path: 'stories/:id',
        name: 'StoryDetail',
        component: () => import('@/views/customer/StoryDetailPage.vue'),
        meta: { title: 'Câu Chuyện' }
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/customer/CartPage.vue'),
        meta: { title: 'Giỏ Hàng' }
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: () => import('@/views/customer/CheckoutPage.vue'),
        meta: { title: 'Thanh Toán', requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'MyOrders',
        component: () => import('@/views/customer/OrdersPage.vue'),
        meta: { title: 'Đơn Hàng Của Tôi', requiresAuth: true }
      },
      {
        path: 'orders/:id',
        name: 'OrderDetail',
        component: () => import('@/views/customer/OrderDetailPage.vue'),
        meta: { title: 'Chi Tiết Đơn Hàng', requiresAuth: true }
      },
      {
        path: 'wishlist',
        name: 'Wishlist',
        component: () => import('@/views/customer/WishlistPage.vue'),
        meta: { title: 'Yêu Thích', requiresAuth: true }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/customer/ProfilePage.vue'),
        meta: { title: 'Tài Khoản', requiresAuth: true }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/customer/AboutPage.vue'),
        meta: { title: 'Về Chúng Tôi' }
      }
    ]
  },

  // ===== AUTH ROUTES =====
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginPage.vue'),
    meta: { title: 'Đăng Nhập', guest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/RegisterPage.vue'),
    meta: { title: 'Đăng Ký', guest: true }
  },

  // ===== ARTISAN ROUTES =====
  {
    path: '/artisan',
    component: () => import('@/views/artisan/ArtisanLayout.vue'),
    meta: { requiresAuth: true, role: 'ARTISAN' },
    children: [
      {
        path: '',
        name: 'ArtisanDashboard',
        component: () => import('@/views/artisan/DashboardPage.vue'),
        meta: { title: 'Kênh Nghệ Nhân' }
      },
      {
        path: 'products',
        name: 'ArtisanProducts',
        component: () => import('@/views/artisan/ProductsManagePage.vue'),
        meta: { title: 'Quản Lý Sản Phẩm' }
      },
      {
        path: 'products/new',
        name: 'ArtisanProductNew',
        component: () => import('@/views/artisan/ProductFormPage.vue'),
        meta: { title: 'Thêm Sản Phẩm' }
      },
      {
        path: 'products/:id/edit',
        name: 'ArtisanProductEdit',
        component: () => import('@/views/artisan/ProductFormPage.vue'),
        meta: { title: 'Sửa Sản Phẩm' }
      },
      {
        path: 'orders',
        name: 'ArtisanOrders',
        component: () => import('@/views/artisan/OrdersManagePage.vue'),
        meta: { title: 'Quản Lý Đơn Hàng' }
      },
      {
        path: 'custom-orders',
        name: 'ArtisanCustomOrders',
        component: () => import('@/views/artisan/CustomOrdersPage.vue'),
        meta: { title: 'Yêu Cầu Custom' }
      },
      {
        path: 'reviews',
        name: 'ArtisanReviews',
        component: () => import('@/views/artisan/ReviewsPage.vue'),
        meta: { title: 'Đánh Giá' }
      },
      {
        path: 'revenue',
        name: 'ArtisanRevenue',
        component: () => import('@/views/artisan/RevenuePage.vue'),
        meta: { title: 'Doanh Thu' }
      },
      {
        path: 'profile',
        name: 'ArtisanProfileEdit',
        component: () => import('@/views/artisan/ProfilePage.vue'),
        meta: { title: 'Hồ Sơ Xưởng' }
      }
    ]
  },

  // ===== ADMIN ROUTES =====
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminLayout.vue'),
    meta: { requiresAuth: true, role: 'ADMIN' },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/DashboardPage.vue'),
        meta: { title: 'Quản Trị Hệ Thống' }
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('@/views/admin/UsersPage.vue'),
        meta: { title: 'Quản Lý Người Dùng' }
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('@/views/admin/ProductsPage.vue'),
        meta: { title: 'Duyệt Sản Phẩm' }
      },
      {
        path: 'artisans',
        name: 'AdminArtisans',
        component: () => import('@/views/admin/ArtisansPage.vue'),
        meta: { title: 'Quản Lý Nghệ Nhân' }
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('@/views/admin/OrdersPage.vue'),
        meta: { title: 'Quản Lý Đơn Hàng' }
      },
      {
        path: 'categories',
        name: 'AdminCategories',
        component: () => import('@/views/admin/CategoriesPage.vue'),
        meta: { title: 'Quản Lý Danh Mục' }
      },
      {
        path: 'coupons',
        name: 'AdminCoupons',
        component: () => import('@/views/admin/CouponsPage.vue'),
        meta: { title: 'Mã Giảm Giá' }
      },
      {
        path: 'reports',
        name: 'AdminReports',
        component: () => import('@/views/admin/ReportsPage.vue'),
        meta: { title: 'Báo Cáo & Thống Kê' }
      },
      {
        path: 'blogs',
        name: 'AdminBlogs',
        component: () => import('@/views/admin/BlogsPage.vue'),
        meta: { title: 'Quản Lý Bài Viết' }
      },
      {
        path: 'settings',
        name: 'AdminSettings',
        component: () => import('@/views/admin/SettingsPage.vue'),
        meta: { title: 'Cài Đặt Hệ Thống' }
      }
    ]
  },

  // ===== 404 =====
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: '404 - Không Tìm Thấy' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

// Navigation guard
router.beforeEach((to, from, next) => {
  // Set page title
  document.title = to.meta.title
    ? `${to.meta.title} | Artesanía Viva`
    : 'Artesanía Viva - Tinh Hoa Thủ Công Tộc Người'

  const authStore = useAuthStore()

  // Check auth
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }

  // Check role
  if (to.meta.role) {
    if (to.meta.role === 'ADMIN' && !authStore.isAdmin) {
      return next({ name: 'Home' })
    }
    if (to.meta.role === 'ARTISAN' && !authStore.isArtisan) {
      return next({ name: 'Home' })
    }
  }

  // Redirect logged-in users away from guest pages
  if (to.meta.guest && authStore.isAuthenticated) {
    return next({ name: 'Home' })
  }

  next()
})

export default router
