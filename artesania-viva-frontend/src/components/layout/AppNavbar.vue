<template>
  <v-app-bar :elevation="scrolled ? 4 : 0" :color="scrolled ? '#0B1426ee' : '#0B1426'" style="backdrop-filter: blur(10px);" class="border-b border-opacity-10">
    <v-container class="d-flex align-center py-0" style="max-width: 1400px;">
      <v-app-bar-nav-icon class="d-md-none" @click="$emit('toggle-drawer')" />

      <router-link to="/" class="d-flex align-center text-decoration-none">
        <v-img src="/images/logo.png" width="40" height="40" class="mr-2 rounded-circle" />
        <span class="text-h5 font-weight-bold font-display text-white">Artesanía Viva</span>
      </router-link>

      <v-spacer />

      <nav class="d-none d-md-flex align-center ga-1">
        <v-btn v-for="link in navLinks" :key="link.to" variant="text" :to="link.to" class="text-capitalize" size="small">
          {{ link.text }}
        </v-btn>
      </nav>

      <v-spacer />

      <div class="d-flex align-center ga-1">
        <v-btn icon variant="text" size="small" @click="showSearch = !showSearch">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon variant="text" size="small" :to="{ name: 'Wishlist' }" class="d-none d-sm-flex">
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>

        <v-btn icon variant="text" size="small" :to="{ name: 'Cart' }">
          <v-badge :content="cartStore.itemCount" color="error" :model-value="cartStore.itemCount > 0" offset-x="-2" offset-y="-2">
            <v-icon>mdi-cart-outline</v-icon>
          </v-badge>
        </v-btn>

        <template v-if="authStore.isAuthenticated">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon size="small" class="ml-1">
                <v-avatar color="primary" size="34">
                  <span class="text-caption font-weight-bold">{{ userInitials }}</span>
                </v-avatar>
              </v-btn>
            </template>
            <v-list bg-color="#152033" min-width="220" rounded="lg" class="py-2">
              <v-list-item class="px-4 mb-2">
                <div class="text-subtitle-2 font-weight-bold">{{ authStore.fullName }}</div>
                <div class="text-caption text-grey">{{ authStore.user?.email }}</div>
                <v-chip size="x-small" :color="roleColor" class="mt-1">{{ roleLabel }}</v-chip>
              </v-list-item>
              <v-divider class="mb-1" />
              <v-list-item prepend-icon="mdi-account" title="Tài khoản" :to="{ name: 'Profile' }" />
              <v-list-item prepend-icon="mdi-package-variant" title="Đơn hàng" :to="{ name: 'MyOrders' }" />
              <v-list-item prepend-icon="mdi-heart" title="Yêu thích" :to="{ name: 'Wishlist' }" />
              <template v-if="authStore.isArtisan">
                <v-divider class="my-1" />
                <v-list-item prepend-icon="mdi-store" title="Kênh Nghệ Nhân" :to="{ name: 'ArtisanDashboard' }" />
              </template>
              <template v-if="authStore.isAdmin">
                <v-divider class="my-1" />
                <v-list-item prepend-icon="mdi-shield-crown" title="Quản Trị" :to="{ name: 'AdminDashboard' }" />
              </template>
              <v-divider class="my-1" />
              <v-list-item prepend-icon="mdi-logout" title="Đăng xuất" @click="handleLogout" />
            </v-list>
          </v-menu>
        </template>
        <template v-else>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" variant="tonal" color="accent" size="small" class="ml-2 d-none d-md-flex text-capitalize">
                <v-icon start size="16">mdi-account-switch</v-icon> Demo
              </v-btn>
            </template>
            <v-list bg-color="#152033" rounded="lg">
              <v-list-item @click="demoLogin('CUSTOMER')" prepend-icon="mdi-account" title="Khách Hàng" />
              <v-list-item @click="demoLogin('ARTISAN')" prepend-icon="mdi-store" title="Nghệ Nhân" />
              <v-list-item @click="demoLogin('ADMIN')" prepend-icon="mdi-shield-crown" title="Quản Trị" />
            </v-list>
          </v-menu>
          <v-btn :to="{ name: 'Login' }" variant="tonal" color="primary" size="small" class="ml-2 d-none d-md-flex text-capitalize">
            Đăng nhập
          </v-btn>
        </template>
      </div>
    </v-container>
  </v-app-bar>

  <!-- Search overlay -->
  <v-dialog v-model="showSearch" width="700" location="top">
    <v-card color="#152033" rounded="xl" class="mt-16">
      <v-text-field
        v-model="searchQuery"
        placeholder="Tìm kiếm sản phẩm, nghệ nhân, dân tộc..."
        prepend-inner-icon="mdi-magnify"
        append-inner-icon="mdi-close"
        @click:append-inner="showSearch = false"
        @keyup.enter="handleSearch"
        autofocus
        hide-details
        variant="solo-filled"
        bg-color="#1E2D47"
        rounded="xl"
        class="pa-1"
      />
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useNotificationStore } from '@/stores/notification'

defineEmits(['toggle-drawer'])

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const notify = useNotificationStore()

const scrolled = ref(false)
const showSearch = ref(false)
const searchQuery = ref('')

const navLinks = [
  { text: 'Trang Chủ', to: '/' },
  { text: 'Sản Phẩm', to: '/products' },
  { text: 'Nghệ Nhân', to: '/artisans' },
  { text: 'Câu Chuyện', to: '/stories' },
  { text: 'Về Chúng Tôi', to: '/about' }
]

const userInitials = computed(() => {
  const name = authStore.fullName || ''
  const parts = name.split(' ')
  return parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : name[0] || 'U'
})

const roleLabel = computed(() => {
  const map = { CUSTOMER: 'Khách Hàng', ARTISAN: 'Nghệ Nhân', ADMIN: 'Admin' }
  return map[authStore.userRole] || 'Khách'
})

const roleColor = computed(() => {
  const map = { CUSTOMER: 'primary', ARTISAN: 'accent', ADMIN: 'warning' }
  return map[authStore.userRole] || 'primary'
})

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({ name: 'Products', query: { q: searchQuery.value } })
    showSearch.value = false
    searchQuery.value = ''
  }
}

function demoLogin(role) {
  authStore.demoLogin(role)
  notify.showSuccess(`Đã đăng nhập demo với vai trò ${roleLabel.value}`)
  if (role === 'ARTISAN') router.push({ name: 'ArtisanDashboard' })
  else if (role === 'ADMIN') router.push({ name: 'AdminDashboard' })
}

function handleLogout() {
  authStore.logout()
  cartStore.clearCart()
  router.push({ name: 'Home' })
  notify.showInfo('Đã đăng xuất')
}

function onScroll() {
  scrolled.value = window.scrollY > 50
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
