import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor - attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('av_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('av_token')
          localStorage.removeItem('av_user')
          window.location.href = '/login'
          break
        case 403:
          console.error('Không có quyền truy cập')
          break
        case 500:
          console.error('Lỗi server')
          break
      }
    }
    return Promise.reject(error)
  }
)

export default api
