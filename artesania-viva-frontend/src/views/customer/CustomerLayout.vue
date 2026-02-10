<template>
  <div>
    <AppNavbar @toggle-drawer="drawer = !drawer" />

    <!-- Mobile drawer -->
    <v-navigation-drawer v-model="drawer" temporary color="#0B1426" width="280">
      <div class="pa-4 d-flex align-center">
        <v-img src="/images/logo.png" width="32" height="32" class="mr-2 rounded-circle" />
        <span class="text-h6 font-weight-bold font-display">Artesanía Viva</span>
      </div>
      <v-divider />
      <v-list nav>
        <v-list-item v-for="link in mobileLinks" :key="link.to" :prepend-icon="link.icon" :title="link.text" :to="link.to" @click="drawer = false" />
      </v-list>
      <v-divider />
      <div class="pa-4">
        <v-btn v-if="!authStore.isAuthenticated" :to="{ name: 'Login' }" block color="primary" class="text-capitalize">Đăng nhập</v-btn>
        <template v-else>
          <v-btn block variant="tonal" @click="authStore.logout(); drawer = false" class="text-capitalize">Đăng xuất</v-btn>
        </template>
      </div>
    </v-navigation-drawer>

    <v-main style="background-color: #0B1426;">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const drawer = ref(false)

const mobileLinks = [
  { text: 'Trang Chủ', to: '/', icon: 'mdi-home' },
  { text: 'Sản Phẩm', to: '/products', icon: 'mdi-shopping' },
  { text: 'Nghệ Nhân', to: '/artisans', icon: 'mdi-account-group' },
  { text: 'Câu Chuyện', to: '/stories', icon: 'mdi-book-open-variant' },
  { text: 'Giỏ Hàng', to: '/cart', icon: 'mdi-cart' },
  { text: 'Yêu Thích', to: '/wishlist', icon: 'mdi-heart' },
  { text: 'Đơn Hàng', to: '/orders', icon: 'mdi-package-variant' },
  { text: 'Về Chúng Tôi', to: '/about', icon: 'mdi-information' },
]
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
