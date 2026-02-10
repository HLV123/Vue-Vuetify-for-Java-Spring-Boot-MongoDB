<template>
  <div>
    <v-app-bar :elevation="0" color="#0B1426" class="border-b border-opacity-10">
      <v-app-bar-nav-icon @click="rail = !rail" />
      <router-link to="/" class="d-flex align-center text-decoration-none">
        <v-img src="/images/logo.png" width="32" height="32" class="mr-2 rounded-circle" />
        <span class="text-h6 font-weight-bold font-display text-white">Artesanía Viva</span>
      </router-link>
      <v-chip color="warning" variant="tonal" size="small" class="ml-3">Admin Panel</v-chip>
      <v-spacer />
      <v-btn icon size="small" variant="text">
        <v-badge content="5" color="error"><v-icon>mdi-bell-outline</v-icon></v-badge>
      </v-btn>
      <v-btn variant="text" :to="{ name: 'Home' }" class="text-capitalize ml-2" size="small">
        <v-icon start size="16">mdi-storefront</v-icon> Xem shop
      </v-btn>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon class="ml-2"><v-avatar color="warning" size="34"><span class="text-caption font-weight-bold">A</span></v-avatar></v-btn>
        </template>
        <v-list bg-color="#152033" rounded="lg">
          <v-list-item prepend-icon="mdi-logout" title="Đăng xuất" @click="logout" />
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer :rail="rail" permanent color="#0B1426" class="border-r border-opacity-10">
      <v-list nav density="compact" class="py-2">
        <v-list-item v-for="item in navItems" :key="item.to" :prepend-icon="item.icon" :title="item.title" :to="{ name: item.to }" rounded="lg" color="warning" />
      </v-list>
    </v-navigation-drawer>

    <v-main style="background-color: #0B1426;">
      <router-view />
    </v-main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const rail = ref(false)

const navItems = [
  { icon: 'mdi-view-dashboard', title: 'Tổng Quan', to: 'AdminDashboard' },
  { icon: 'mdi-account-group', title: 'Người Dùng', to: 'AdminUsers' },
  { icon: 'mdi-package-variant', title: 'Duyệt Sản Phẩm', to: 'AdminProducts' },
  { icon: 'mdi-store', title: 'Nghệ Nhân', to: 'AdminArtisans' },
  { icon: 'mdi-clipboard-list', title: 'Đơn Hàng', to: 'AdminOrders' },
  { icon: 'mdi-shape', title: 'Danh Mục', to: 'AdminCategories' },
  { icon: 'mdi-ticket-percent', title: 'Mã Giảm Giá', to: 'AdminCoupons' },
  { icon: 'mdi-chart-bar', title: 'Báo Cáo', to: 'AdminReports' },
  { icon: 'mdi-post', title: 'Bài Viết', to: 'AdminBlogs' },
  { icon: 'mdi-cog', title: 'Cài Đặt', to: 'AdminSettings' },
]

function logout() { authStore.logout(); router.push('/') }
</script>
