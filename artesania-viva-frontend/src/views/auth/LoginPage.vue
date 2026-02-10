<template>
  <div class="d-flex align-center justify-center" style="min-height: 100vh; background: radial-gradient(ellipse at top, #152033 0%, #0B1426 60%);">
    <v-container style="max-width: 460px;">
      <div class="text-center mb-8">
        <router-link to="/" class="d-inline-flex align-center text-decoration-none mb-6">
          <v-img src="/images/logo.png" width="48" height="48" class="mr-2 rounded-circle" />
          <span class="text-h4 font-weight-bold font-display text-white">Artesanía Viva</span>
        </router-link>
        <h1 class="text-h5 font-weight-bold mb-1">Chào Mừng Trở Lại</h1>
        <p class="text-body-2 text-grey">Đăng nhập để tiếp tục mua sắm</p>
      </div>

      <v-card class="glass-card pa-8">
        <v-form @submit.prevent="handleLogin">
          <v-text-field v-model="form.email" label="Email" type="email" prepend-inner-icon="mdi-email-outline"
            :rules="[v => !!v || 'Vui lòng nhập email']" class="mb-2" />
          <v-text-field v-model="form.password" label="Mật khẩu" :type="showPw ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-outline" :append-inner-icon="showPw ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPw = !showPw" :rules="[v => !!v || 'Vui lòng nhập mật khẩu']" class="mb-1" />

          <div class="d-flex justify-space-between align-center mb-4">
            <v-checkbox v-model="form.remember" label="Ghi nhớ" density="compact" hide-details color="primary" />
            <a href="#" class="text-caption text-primary text-decoration-none">Quên mật khẩu?</a>
          </div>

          <v-btn block size="large" color="primary" type="submit" :loading="authStore.loading" class="text-capitalize mb-4" rounded="xl">
            Đăng Nhập
          </v-btn>

          <v-alert v-if="authStore.error" type="error" variant="tonal" density="compact" class="mb-4">{{ authStore.error }}</v-alert>

          <v-divider class="my-4"><span class="text-caption text-grey px-2">hoặc</span></v-divider>

          <div class="d-flex ga-2 mb-4">
            <v-btn block variant="outlined" class="text-capitalize" @click="demoLogin('CUSTOMER')">
              <v-icon start>mdi-account</v-icon> Demo Khách
            </v-btn>
            <v-btn block variant="outlined" class="text-capitalize" @click="demoLogin('ARTISAN')">
              <v-icon start>mdi-store</v-icon> Demo Nghệ Nhân
            </v-btn>
          </div>
          <v-btn block variant="outlined" color="warning" class="text-capitalize mb-4" @click="demoLogin('ADMIN')">
            <v-icon start>mdi-shield-crown</v-icon> Demo Admin
          </v-btn>
        </v-form>

        <div class="text-center text-body-2">
          Chưa có tài khoản? <router-link to="/register" class="text-primary text-decoration-none font-weight-bold">Đăng ký ngay</router-link>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notification'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const notify = useNotificationStore()
const showPw = ref(false)

const form = reactive({ email: '', password: '', remember: false })

async function handleLogin() {
  try {
    await authStore.login({ email: form.email, password: form.password })
    notify.showSuccess('Đăng nhập thành công!')
    router.push(route.query.redirect || '/')
  } catch {
    // error handled in store
  }
}

function demoLogin(role) {
  authStore.demoLogin(role)
  notify.showSuccess('Đăng nhập demo thành công!')
  if (role === 'ADMIN') router.push('/admin')
  else if (role === 'ARTISAN') router.push('/artisan')
  else router.push(route.query.redirect || '/')
}
</script>
