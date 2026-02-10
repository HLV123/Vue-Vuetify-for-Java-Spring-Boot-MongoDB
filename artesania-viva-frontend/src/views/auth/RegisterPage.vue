<template>
  <div class="d-flex align-center justify-center" style="min-height: 100vh; background: radial-gradient(ellipse at top, #152033 0%, #0B1426 60%);">
    <v-container style="max-width: 500px;">
      <div class="text-center mb-6">
        <router-link to="/" class="d-inline-flex align-center text-decoration-none mb-4">
          <v-img src="/images/logo.png" width="48" height="48" class="mr-2 rounded-circle" />
          <span class="text-h4 font-weight-bold font-display text-white">Artesanía Viva</span>
        </router-link>
        <h1 class="text-h5 font-weight-bold mb-1">Tạo Tài Khoản</h1>
        <p class="text-body-2 text-grey">Gia nhập cộng đồng yêu thủ công mỹ nghệ</p>
      </div>

      <v-card class="glass-card pa-8">
        <v-form @submit.prevent="handleRegister">
          <v-text-field v-model="form.fullName" label="Họ và tên *" prepend-inner-icon="mdi-account-outline" class="mb-1" />
          <v-text-field v-model="form.email" label="Email *" type="email" prepend-inner-icon="mdi-email-outline" class="mb-1" />
          <v-text-field v-model="form.phone" label="Số điện thoại *" prepend-inner-icon="mdi-phone-outline" class="mb-1" />
          <v-text-field v-model="form.password" label="Mật khẩu *" :type="showPw ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-outline" :append-inner-icon="showPw ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPw = !showPw" class="mb-1" />
          <v-text-field v-model="form.confirmPassword" label="Xác nhận mật khẩu *" :type="showPw ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-check-outline" class="mb-2" />

          <v-select v-model="form.role" :items="roles" item-title="text" item-value="value" label="Bạn muốn" class="mb-2" />

          <v-checkbox v-model="form.agreeTerms" color="primary" density="compact" hide-details class="mb-4">
            <template v-slot:label>
              <span class="text-body-2">Tôi đồng ý với <a href="#" class="text-primary">Điều khoản</a> và <a href="#" class="text-primary">Chính sách bảo mật</a></span>
            </template>
          </v-checkbox>

          <v-btn block size="large" color="primary" type="submit" :loading="loading" class="text-capitalize" rounded="xl">
            Đăng Ký
          </v-btn>
        </v-form>

        <div class="text-center text-body-2 mt-4">
          Đã có tài khoản? <router-link to="/login" class="text-primary text-decoration-none font-weight-bold">Đăng nhập</router-link>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notification'

const router = useRouter()
const authStore = useAuthStore()
const notify = useNotificationStore()
const showPw = ref(false)
const loading = ref(false)

const roles = [
  { text: 'Mua sắm (Khách hàng)', value: 'CUSTOMER' },
  { text: 'Bán hàng (Nghệ nhân)', value: 'ARTISAN' }
]

const form = reactive({
  fullName: '', email: '', phone: '', password: '', confirmPassword: '', role: 'CUSTOMER', agreeTerms: false
})

async function handleRegister() {
  if (!form.fullName || !form.email || !form.password) {
    notify.showError('Vui lòng điền đầy đủ thông tin')
    return
  }
  if (form.password !== form.confirmPassword) {
    notify.showError('Mật khẩu không khớp')
    return
  }
  if (!form.agreeTerms) {
    notify.showError('Vui lòng đồng ý với điều khoản sử dụng')
    return
  }
  loading.value = true
  try {
    await authStore.register(form)
    notify.showSuccess('Đăng ký thành công!')
    router.push('/')
  } catch {
    // Demo: auto login
    authStore.demoLogin(form.role)
    notify.showSuccess('Đăng ký demo thành công!')
    router.push(form.role === 'ARTISAN' ? '/artisan' : '/')
  } finally {
    loading.value = false
  }
}
</script>
