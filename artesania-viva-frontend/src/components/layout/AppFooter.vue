<template>
  <v-footer color="#0B1426" class="border-t border-opacity-10 py-12">
    <v-container style="max-width: 1400px;">
      <v-row>
        <v-col cols="12" md="4" class="mb-6 mb-md-0">
          <div class="d-flex align-center mb-4">
            <v-img src="/images/logo.png" width="36" height="36" class="mr-2 rounded-circle" />
            <span class="text-h5 font-weight-bold font-display">Artesanía Viva</span>
          </div>
          <p class="text-body-2 text-grey mb-4" style="max-width: 320px;">
            Nền tảng kết nối và bảo tồn văn hóa thủ công mỹ nghệ các dân tộc thiểu số Việt Nam. Mỗi sản phẩm là một di sản.
          </p>
          <div class="d-flex ga-3">
            <v-btn icon variant="tonal" size="small" color="primary"><v-icon>mdi-facebook</v-icon></v-btn>
            <v-btn icon variant="tonal" size="small" color="primary"><v-icon>mdi-instagram</v-icon></v-btn>
            <v-btn icon variant="tonal" size="small" color="primary"><v-icon>mdi-youtube</v-icon></v-btn>
            <v-btn icon variant="tonal" size="small" color="primary"><v-icon>mdi-tiktok</v-icon></v-btn>
          </div>
        </v-col>

        <v-col cols="6" sm="3" md="2">
          <div class="font-weight-bold mb-4 text-body-2">Khám Phá</div>
          <div class="d-flex flex-column ga-2">
            <router-link to="/products" class="text-decoration-none text-grey text-body-2 footer-link">Sản Phẩm</router-link>
            <router-link to="/artisans" class="text-decoration-none text-grey text-body-2 footer-link">Nghệ Nhân</router-link>
            <router-link to="/stories" class="text-decoration-none text-grey text-body-2 footer-link">Câu Chuyện</router-link>
            <router-link to="/about" class="text-decoration-none text-grey text-body-2 footer-link">Về Chúng Tôi</router-link>
          </div>
        </v-col>

        <v-col cols="6" sm="3" md="2">
          <div class="font-weight-bold mb-4 text-body-2">Hỗ Trợ</div>
          <div class="d-flex flex-column ga-2">
            <a href="#" class="text-decoration-none text-grey text-body-2 footer-link">Trung tâm trợ giúp</a>
            <a href="#" class="text-decoration-none text-grey text-body-2 footer-link">Chính sách bảo hành</a>
            <a href="#" class="text-decoration-none text-grey text-body-2 footer-link">Vận chuyển & Đổi trả</a>
            <a href="#" class="text-decoration-none text-grey text-body-2 footer-link">Điều khoản sử dụng</a>
          </div>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <div class="font-weight-bold mb-4 text-body-2">Đăng Ký Nhận Tin</div>
          <p class="text-body-2 text-grey mb-3">Nhận thông tin sản phẩm mới và câu chuyện văn hóa hàng tuần.</p>
          <div class="d-flex ga-2">
            <v-text-field
              v-model="email"
              placeholder="Email của bạn"
              hide-details
              density="compact"
              variant="outlined"
              rounded="lg"
              class="flex-grow-1"
            />
            <v-btn color="primary" variant="flat" rounded="lg" @click="subscribe">
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </div>
          <div class="d-flex align-center ga-6 mt-6">
            <div class="d-flex align-center ga-1">
              <v-icon size="18" color="accent">mdi-truck-fast</v-icon>
              <span class="text-caption text-grey">Miễn phí ship 500k+</span>
            </div>
            <div class="d-flex align-center ga-1">
              <v-icon size="18" color="accent">mdi-shield-check</v-icon>
              <span class="text-caption text-grey">Bảo hành trọn đời</span>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-8 border-opacity-10" />

      <div class="d-flex flex-column flex-sm-row justify-space-between align-center text-caption text-grey ga-2">
        <span>&copy; {{ new Date().getFullYear() }} Artesanía Viva. All rights reserved.</span>
        <div class="d-flex ga-4">
          <a href="#" class="text-decoration-none text-grey footer-link">Chính sách bảo mật</a>
          <a href="#" class="text-decoration-none text-grey footer-link">Điều khoản</a>
          <a href="#" class="text-decoration-none text-grey footer-link">Cookies</a>
        </div>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup>
import { ref } from 'vue'
import { useNotificationStore } from '@/stores/notification'

const notify = useNotificationStore()
const email = ref('')

function subscribe() {
  if (email.value && email.value.includes('@')) {
    notify.showSuccess('Đăng ký nhận tin thành công!')
    email.value = ''
  } else {
    notify.showError('Vui lòng nhập email hợp lệ')
  }
}
</script>

<style scoped>
.footer-link {
  transition: color 0.2s;
}
.footer-link:hover {
  color: #4C6EF5 !important;
}
</style>
