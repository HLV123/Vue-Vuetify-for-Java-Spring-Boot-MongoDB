<template>
  <v-container style="max-width: 1200px;" class="py-8">
    <h1 class="text-h4 font-weight-bold font-display mb-6"><v-icon class="mr-2">mdi-lock</v-icon> Thanh Toán</h1>
    <v-row>
      <v-col cols="12" md="7">
        <!-- Shipping Info -->
        <v-card class="glass-card pa-6 mb-4">
          <h3 class="text-h6 font-weight-bold mb-4"><v-icon class="mr-2" color="primary">mdi-map-marker</v-icon> Địa Chỉ Giao Hàng</h3>
          <v-row>
            <v-col cols="12" sm="6"><v-text-field v-model="form.fullName" label="Họ và tên *" /></v-col>
            <v-col cols="12" sm="6"><v-text-field v-model="form.phone" label="Số điện thoại *" /></v-col>
            <v-col cols="12"><v-text-field v-model="form.email" label="Email *" type="email" /></v-col>
            <v-col cols="12" sm="6">
              <v-select v-model="form.province" :items="provinces" label="Tỉnh/Thành *" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select v-model="form.district" :items="districts" label="Quận/Huyện *" />
            </v-col>
            <v-col cols="12"><v-text-field v-model="form.address" label="Địa chỉ chi tiết *" /></v-col>
            <v-col cols="12"><v-textarea v-model="form.note" label="Ghi chú đơn hàng" rows="2" /></v-col>
          </v-row>
        </v-card>

        <!-- Payment Method -->
        <v-card class="glass-card pa-6">
          <h3 class="text-h6 font-weight-bold mb-4"><v-icon class="mr-2" color="primary">mdi-credit-card</v-icon> Phương Thức Thanh Toán</h3>
          <v-radio-group v-model="form.paymentMethod">
            <v-radio value="COD" class="mb-2">
              <template v-slot:label><div class="d-flex align-center"><v-icon class="mr-2">mdi-cash</v-icon> Thanh toán khi nhận hàng (COD)</div></template>
            </v-radio>
            <v-radio value="BANK_TRANSFER" class="mb-2">
              <template v-slot:label><div class="d-flex align-center"><v-icon class="mr-2">mdi-bank</v-icon> Chuyển khoản ngân hàng</div></template>
            </v-radio>
            <v-radio value="MOMO" class="mb-2">
              <template v-slot:label><div class="d-flex align-center"><v-icon class="mr-2">mdi-wallet</v-icon> Ví MoMo</div></template>
            </v-radio>
            <v-radio value="VNPAY">
              <template v-slot:label><div class="d-flex align-center"><v-icon class="mr-2">mdi-credit-card-outline</v-icon> VNPay</div></template>
            </v-radio>
          </v-radio-group>
        </v-card>
      </v-col>

      <!-- Order summary -->
      <v-col cols="12" md="5">
        <v-card class="glass-card pa-6 position-sticky" style="top: 80px;">
          <h3 class="text-h6 font-weight-bold mb-4">Đơn Hàng Của Bạn</h3>
          <div v-for="item in cartStore.items" :key="item.productId" class="d-flex ga-3 mb-3">
            <v-img :src="item.image" width="60" height="60" cover class="rounded flex-shrink-0" />
            <div class="flex-grow-1">
              <div class="text-body-2 font-weight-medium text-truncate">{{ item.name }}</div>
              <div class="text-caption text-grey">SL: {{ item.quantity }}</div>
            </div>
            <div class="text-body-2 font-weight-bold">{{ formatPrice(item.price * item.quantity) }}</div>
          </div>
          <v-divider class="my-4" />
          <div class="d-flex justify-space-between mb-2 text-body-2"><span class="text-grey">Tạm tính</span><span>{{ formatPrice(cartStore.subtotal) }}</span></div>
          <div v-if="cartStore.discount > 0" class="d-flex justify-space-between mb-2 text-body-2"><span class="text-green">Giảm giá</span><span class="text-green">-{{ formatPrice(cartStore.discount) }}</span></div>
          <div class="d-flex justify-space-between mb-4 text-body-2"><span class="text-grey">Phí vận chuyển</span><span>{{ cartStore.shippingFee === 0 ? 'Miễn phí' : formatPrice(cartStore.shippingFee) }}</span></div>
          <v-divider class="mb-4" />
          <div class="d-flex justify-space-between mb-6"><span class="text-h6 font-weight-bold">Tổng cộng</span><span class="text-h5 font-weight-bold" style="color:#4C6EF5;">{{ formatPrice(cartStore.total) }}</span></div>
          <v-btn block size="x-large" color="primary" class="text-capitalize" rounded="xl" :loading="submitting" @click="placeOrder">
            <v-icon start>mdi-check-circle</v-icon> Đặt Hàng
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Success dialog -->
    <v-dialog v-model="showSuccess" max-width="500" persistent>
      <v-card class="glass-card pa-8 text-center">
        <v-icon size="80" color="success">mdi-check-circle</v-icon>
        <h2 class="text-h5 font-weight-bold mt-4 mb-2">Đặt Hàng Thành Công!</h2>
        <p class="text-body-1 text-grey mb-2">Mã đơn hàng: <strong class="text-white">#AV-{{ orderCode }}</strong></p>
        <p class="text-body-2 text-grey mb-6">Cảm ơn bạn đã ủng hộ nghệ nhân. Chúng tôi sẽ xác nhận đơn hàng qua email.</p>
        <div class="d-flex ga-3 justify-center">
          <v-btn color="primary" :to="{ name: 'MyOrders' }" class="text-capitalize">Xem đơn hàng</v-btn>
          <v-btn variant="outlined" :to="{ name: 'Home' }" class="text-capitalize">Về trang chủ</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useNotificationStore } from '@/stores/notification'
import { formatPrice } from '@/utils/helpers'

const cartStore = useCartStore()
const notify = useNotificationStore()

const submitting = ref(false)
const showSuccess = ref(false)
const orderCode = ref('')

const form = reactive({
  fullName: '', phone: '', email: '', province: '', district: '', address: '', note: '', paymentMethod: 'COD'
})

const provinces = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Lào Cai', 'Sapa']
const districts = ['Quận 1', 'Quận 2', 'Quận 3', 'Ba Đình', 'Hoàn Kiếm', 'Cầu Giấy']

async function placeOrder() {
  if (!form.fullName || !form.phone || !form.address || !form.province) {
    notify.showError('Vui lòng điền đầy đủ thông tin giao hàng')
    return
  }
  submitting.value = true
  await new Promise(r => setTimeout(r, 1500))
  orderCode.value = Math.random().toString(36).substr(2, 8).toUpperCase()
  cartStore.clearCart()
  submitting.value = false
  showSuccess.value = true
}
</script>
