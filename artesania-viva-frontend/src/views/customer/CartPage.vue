<template>
  <v-container style="max-width: 1200px;" class="py-8">
    <h1 class="text-h4 font-weight-bold font-display mb-6">
      <v-icon class="mr-2">mdi-cart</v-icon> Giỏ Hàng
      <span class="text-body-1 text-grey">({{ cartStore.itemCount }} sản phẩm)</span>
    </h1>

    <div v-if="cartStore.isEmpty" class="text-center py-16">
      <v-icon size="80" color="grey-darken-1">mdi-cart-off</v-icon>
      <h2 class="text-h5 mt-4 mb-2">Giỏ hàng trống</h2>
      <p class="text-body-1 text-grey mb-6">Hãy khám phá các sản phẩm thủ công độc đáo!</p>
      <v-btn color="primary" size="large" :to="{ name: 'Products' }" class="text-capitalize" rounded="xl">
        <v-icon start>mdi-shopping</v-icon> Mua sắm ngay
      </v-btn>
    </div>

    <v-row v-else>
      <v-col cols="12" md="8">
        <v-card v-for="item in cartStore.items" :key="item.productId" class="glass-card mb-3 pa-4">
          <div class="d-flex ga-4">
            <v-img :src="item.image" width="120" height="120" cover class="rounded-lg flex-shrink-0 cursor-pointer"
              @click="$router.push({ name: 'ProductDetail', params: { id: item.productId } })" />
            <div class="flex-grow-1 d-flex flex-column">
              <div class="d-flex justify-space-between">
                <div>
                  <h3 class="text-subtitle-1 font-weight-bold mb-1 cursor-pointer"
                    @click="$router.push({ name: 'ProductDetail', params: { id: item.productId } })">
                    {{ item.name }}
                  </h3>
                  <div class="text-caption text-grey mb-2">Nghệ nhân: {{ item.artisan }}</div>
                  <v-chip v-if="item.isUnique" size="x-small" class="unique-badge">Độc Bản</v-chip>
                </div>
                <v-btn icon size="small" variant="text" color="error" @click="removeItem(item.productId)">
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
              </div>
              <div class="d-flex justify-space-between align-center mt-auto">
                <div v-if="!item.isUnique" class="d-flex align-center">
                  <v-btn icon size="x-small" variant="tonal" @click="cartStore.updateQuantity(item.productId, item.quantity - 1)">
                    <v-icon size="16">mdi-minus</v-icon>
                  </v-btn>
                  <span class="mx-3 text-body-1 font-weight-bold">{{ item.quantity }}</span>
                  <v-btn icon size="x-small" variant="tonal" @click="cartStore.updateQuantity(item.productId, item.quantity + 1)">
                    <v-icon size="16">mdi-plus</v-icon>
                  </v-btn>
                </div>
                <span v-else class="text-caption text-grey">SL: 1</span>
                <span class="text-h6 font-weight-bold" style="color: #4C6EF5;">{{ formatPrice(item.price * item.quantity) }}</span>
              </div>
            </div>
          </div>
        </v-card>

        <div class="d-flex justify-space-between mt-4">
          <v-btn variant="text" color="grey" :to="{ name: 'Products' }" class="text-capitalize">
            <v-icon start>mdi-arrow-left</v-icon> Tiếp tục mua sắm
          </v-btn>
          <v-btn variant="text" color="error" @click="cartStore.clearCart()" class="text-capitalize">
            <v-icon start>mdi-delete</v-icon> Xóa giỏ hàng
          </v-btn>
        </div>
      </v-col>

      <!-- Order summary -->
      <v-col cols="12" md="4">
        <v-card class="glass-card pa-5 position-sticky" style="top: 80px;">
          <h3 class="text-h6 font-weight-bold mb-4">Tổng Đơn Hàng</h3>

          <!-- Coupon -->
          <div class="d-flex ga-2 mb-4">
            <v-text-field v-model="couponCode" placeholder="Mã giảm giá" hide-details density="compact" />
            <v-btn color="accent" variant="tonal" @click="applyCoupon" class="text-capitalize">Áp dụng</v-btn>
          </div>

          <v-divider class="mb-4" />

          <div class="d-flex justify-space-between mb-2">
            <span class="text-body-2 text-grey">Tạm tính</span>
            <span class="text-body-2">{{ formatPrice(cartStore.subtotal) }}</span>
          </div>
          <div v-if="cartStore.discount > 0" class="d-flex justify-space-between mb-2">
            <span class="text-body-2 text-green">Giảm giá</span>
            <span class="text-body-2 text-green">-{{ formatPrice(cartStore.discount) }}</span>
          </div>
          <div class="d-flex justify-space-between mb-4">
            <span class="text-body-2 text-grey">Phí vận chuyển</span>
            <span class="text-body-2" :class="{ 'text-green': cartStore.shippingFee === 0 }">
              {{ cartStore.shippingFee === 0 ? 'Miễn phí' : formatPrice(cartStore.shippingFee) }}
            </span>
          </div>
          <div v-if="cartStore.shippingFee > 0" class="text-caption text-grey mb-4">
            <v-icon size="14" color="info">mdi-information</v-icon> Miễn phí ship cho đơn từ 500.000đ
          </div>

          <v-divider class="mb-4" />

          <div class="d-flex justify-space-between mb-6">
            <span class="text-h6 font-weight-bold">Tổng cộng</span>
            <span class="text-h5 font-weight-bold" style="color: #4C6EF5;">{{ formatPrice(cartStore.total) }}</span>
          </div>

          <v-btn block size="x-large" color="primary" class="text-capitalize" rounded="xl" :to="{ name: 'Checkout' }">
            <v-icon start>mdi-lock</v-icon> Tiến hành thanh toán
          </v-btn>

          <div class="d-flex justify-center ga-4 mt-4">
            <v-icon size="24" color="grey">mdi-shield-check</v-icon>
            <v-icon size="24" color="grey">mdi-truck-fast</v-icon>
            <v-icon size="24" color="grey">mdi-undo</v-icon>
          </div>
          <div class="text-caption text-grey text-center mt-1">Bảo mật • Vận chuyển nhanh • Đổi trả dễ dàng</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useNotificationStore } from '@/stores/notification'
import { formatPrice } from '@/utils/helpers'

const cartStore = useCartStore()
const notify = useNotificationStore()
const couponCode = ref('')

function removeItem(productId) {
  cartStore.removeItem(productId)
  notify.showInfo('Đã xóa sản phẩm khỏi giỏ hàng')
}

function applyCoupon() {
  if (couponCode.value.toUpperCase() === 'ARTESANIA10') {
    cartStore.applyCoupon({ type: 'PERCENT', value: 10, maxDiscount: 200000, code: couponCode.value })
    notify.showSuccess('Áp dụng mã giảm giá thành công! Giảm 10%')
  } else {
    notify.showError('Mã giảm giá không hợp lệ')
  }
}
</script>
