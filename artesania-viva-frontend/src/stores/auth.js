import { defineStore } from 'pinia'
import { authService } from '@/api/services'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('av_user') || 'null'),
    token: localStorage.getItem('av_token') || null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'ADMIN',
    isArtisan: (state) => state.user?.role === 'ARTISAN' || state.user?.role === 'ADMIN',
    isCustomer: (state) => state.user?.role === 'CUSTOMER',
    userRole: (state) => state.user?.role || 'GUEST',
    fullName: (state) => state.user?.fullName || 'Khách'
  },

  actions: {
    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        const { data } = await authService.login(credentials)
        this.token = data.token
        this.user = data.user
        localStorage.setItem('av_token', data.token)
        localStorage.setItem('av_user', JSON.stringify(data.user))
        return data
      } catch (err) {
        this.error = err.response?.data?.message || 'Đăng nhập thất bại'
        throw err
      } finally {
        this.loading = false
      }
    },

    async register(userData) {
      this.loading = true
      this.error = null
      try {
        const { data } = await authService.register(userData)
        this.token = data.token
        this.user = data.user
        localStorage.setItem('av_token', data.token)
        localStorage.setItem('av_user', JSON.stringify(data.user))
        return data
      } catch (err) {
        this.error = err.response?.data?.message || 'Đăng ký thất bại'
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchProfile() {
      try {
        const { data } = await authService.getProfile()
        this.user = data
        localStorage.setItem('av_user', JSON.stringify(data))
      } catch (err) {
        this.logout()
      }
    },

    async updateProfile(profileData) {
      this.loading = true
      try {
        const { data } = await authService.updateProfile(profileData)
        this.user = { ...this.user, ...data }
        localStorage.setItem('av_user', JSON.stringify(this.user))
        return data
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('av_token')
      localStorage.removeItem('av_user')
    },

    // For demo: simulate login without backend
    demoLogin(role) {
      const demoUsers = {
        CUSTOMER: {
          id: 'demo-customer',
          fullName: 'Nguyễn Văn Khách',
          email: 'khach@demo.com',
          role: 'CUSTOMER',
          avatar: null,
          phone: '0901234567'
        },
        ARTISAN: {
          id: 'demo-artisan',
          fullName: 'Mùa A Súa',
          email: 'artisan@demo.com',
          role: 'ARTISAN',
          avatar: null,
          phone: '0912345678',
          artisanProfile: {
            shopName: 'Xưởng Thổ Cẩm Mùa A Súa',
            ethnic: "H'Mong",
            village: 'Tả Phìn, Sapa',
            bio: 'Hơn 20 năm kinh nghiệm dệt lanh và nhuộm chàm thủ công.'
          }
        },
        ADMIN: {
          id: 'demo-admin',
          fullName: 'Admin Artesanía',
          email: 'admin@artesaniaviva.vn',
          role: 'ADMIN',
          avatar: null
        }
      }
      this.user = demoUsers[role]
      this.token = 'demo-token-' + role.toLowerCase()
      localStorage.setItem('av_token', this.token)
      localStorage.setItem('av_user', JSON.stringify(this.user))
    }
  }
})
