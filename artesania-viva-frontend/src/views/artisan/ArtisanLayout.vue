<template>
  <div>
    <v-app-bar :elevation="0" color="#0B1426" class="border-b border-opacity-10">
      <v-app-bar-nav-icon @click="rail = !rail" />
      <router-link to="/" class="d-flex align-center text-decoration-none">
        <v-img src="/images/logo.png" width="32" height="32" class="mr-2 rounded-circle" />
        <span class="text-h6 font-weight-bold font-display text-white">Artesanía Viva</span>
      </router-link>
      <v-chip color="accent" variant="tonal" size="small" class="ml-3">Kênh Nghệ Nhân</v-chip>
      <v-spacer />
      <v-btn icon size="small" variant="text"><v-icon>mdi-bell-outline</v-icon></v-btn>
      <v-btn variant="text" :to="{ name: 'Home' }" class="text-capitalize ml-2" size="small">
        <v-icon start size="16">mdi-storefront</v-icon> Xem cửa hàng
      </v-btn>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon class="ml-2"><v-avatar color="accent" size="34"><span class="text-caption font-weight-bold">N</span></v-avatar></v-btn>
        </template>
        <v-list bg-color="#152033" rounded="lg">
          <v-list-item prepend-icon="mdi-account" title="Tài khoản" :to="{ name: 'Profile' }" />
          <v-list-item prepend-icon="mdi-logout" title="Đăng xuất" @click="logout" />
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer :rail="rail" permanent color="#0B1426" class="border-r border-opacity-10">
      <v-list nav density="compact" class="py-2">
        <v-list-item v-for="item in navItems" :key="item.to" :prepend-icon="item.icon" :title="item.title" :to="{ name: item.to }" rounded="lg" color="accent" />
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
  { icon: 'mdi-view-dashboard', title: 'Tổng Quan', to: 'ArtisanDashboard' },
  { icon: 'mdi-package-variant-closed', title: 'Sản Phẩm', to: 'ArtisanProducts' },
  { icon: 'mdi-clipboard-list', title: 'Đơn Hàng', to: 'ArtisanOrders' },
  { icon: 'mdi-palette', title: 'Yêu Cầu Custom', to: 'ArtisanCustomOrders' },
  { icon: 'mdi-star', title: 'Đánh Giá', to: 'ArtisanReviews' },
  { icon: 'mdi-chart-line', title: 'Doanh Thu', to: 'ArtisanRevenue' },
  { icon: 'mdi-account-edit', title: 'Hồ Sơ Xưởng', to: 'ArtisanProfileEdit' },
]

function logout() { authStore.logout(); router.push('/') }
</script>
