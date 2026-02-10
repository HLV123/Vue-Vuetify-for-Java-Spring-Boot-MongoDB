import { defineStore } from 'pinia'
import { cartService } from '@/api/services'
import { useAuthStore } from './auth'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    loading: false,
    coupon: null,
    couponDiscount: 0
  }),

  getters: {
    itemCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: (state) => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    discount: (state) => state.couponDiscount,
    shippingFee: (state) => {
      const sub = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      return sub >= 500000 ? 0 : 30000
    },
    total() {
      return this.subtotal - this.discount + this.shippingFee
    },
    isEmpty: (state) => state.items.length === 0
  },

  actions: {
    async fetchCart() {
      const authStore = useAuthStore()
      if (!authStore.isAuthenticated) {
        this.loadLocal()
        return
      }
      this.loading = true
      try {
        const { data } = await cartService.get()
        this.items = data.items || []
      } catch {
        this.loadLocal()
      } finally {
        this.loading = false
      }
    },

    async addItem(product, quantity = 1) {
      const existing = this.items.find(i => i.productId === product.id)
      if (existing) {
        if (product.isUnique) return // can't add more than 1 for unique items
        existing.quantity += quantity
      } else {
        this.items.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || product.image,
          quantity,
          artisan: product.artisanName || product.artisan,
          isUnique: product.isUnique || false
        })
      }
      this.saveLocal()

      const authStore = useAuthStore()
      if (authStore.isAuthenticated) {
        try {
          await cartService.addItem(product.id, quantity)
        } catch { /* fallback to local */ }
      }
    },

    async updateQuantity(productId, quantity) {
      const item = this.items.find(i => i.productId === productId)
      if (!item) return
      if (quantity <= 0) {
        this.removeItem(productId)
        return
      }
      if (item.isUnique && quantity > 1) return
      item.quantity = quantity
      this.saveLocal()
    },

    async removeItem(productId) {
      this.items = this.items.filter(i => i.productId !== productId)
      this.saveLocal()
    },

    async clearCart() {
      this.items = []
      this.coupon = null
      this.couponDiscount = 0
      this.saveLocal()
    },

    applyCoupon(coupon) {
      this.coupon = coupon
      if (coupon.type === 'PERCENT') {
        this.couponDiscount = Math.min(this.subtotal * coupon.value / 100, coupon.maxDiscount || Infinity)
      } else {
        this.couponDiscount = coupon.value
      }
    },

    removeCoupon() {
      this.coupon = null
      this.couponDiscount = 0
    },

    saveLocal() {
      localStorage.setItem('av_cart', JSON.stringify(this.items))
    },

    loadLocal() {
      try {
        const saved = localStorage.getItem('av_cart')
        if (saved) this.items = JSON.parse(saved)
      } catch {
        this.items = []
      }
    }
  }
})
