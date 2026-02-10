<template>
  <v-card class="glass-card product-card h-100 d-flex flex-column" hover @click="$router.push({ name: 'ProductDetail', params: { id: product.id } })">
    <div class="position-relative overflow-hidden" style="border-radius: 8px 8px 0 0;">
      <v-img :src="product.image || product.images?.[0]" height="260" cover class="product-img">
        <div class="d-flex justify-space-between pa-3">
          <v-chip v-if="product.isUnique" class="unique-badge" size="small">
            <v-icon start size="14">mdi-star-four-points</v-icon> Độc Bản
          </v-chip>
          <v-chip v-if="product.originalPrice" color="error" size="small" variant="flat">
            -{{ discountPercent }}%
          </v-chip>
        </div>
      </v-img>
      <!-- Quick actions overlay -->
      <div class="product-actions d-flex ga-1">
        <v-btn icon size="small" variant="flat" color="white" @click.stop="toggleWishlist">
          <v-icon :color="wishlisted ? 'error' : 'grey-darken-1'" size="18">
            {{ wishlisted ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
        </v-btn>
        <v-btn icon size="small" variant="flat" color="white" @click.stop="handleAddToCart">
          <v-icon color="primary" size="18">mdi-cart-plus</v-icon>
        </v-btn>
      </div>
    </div>

    <v-card-item class="flex-grow-1 pb-2">
      <div class="d-flex align-center ga-2 mb-1">
        <v-chip size="x-small" color="accent" variant="tonal">{{ product.ethnicGroup }}</v-chip>
        <span class="text-caption text-grey">{{ product.categoryName }}</span>
      </div>
      <div class="text-subtitle-1 font-weight-medium text-ellipsis-2 mb-1" style="line-height: 1.3;">
        {{ product.name }}
      </div>
      <div class="text-caption text-grey mb-2">
        <v-icon size="12" class="mr-1">mdi-account-circle</v-icon>
        {{ product.artisanName }}
      </div>
      <div class="d-flex align-center ga-2">
        <span class="text-h6 font-weight-bold" style="color: #4C6EF5;">{{ formatPrice(product.price) }}</span>
        <span v-if="product.originalPrice" class="text-body-2 text-grey text-decoration-line-through">
          {{ formatPrice(product.originalPrice) }}
        </span>
      </div>
      <div v-if="product.rating" class="d-flex align-center mt-1 ga-1">
        <v-rating :model-value="product.rating" density="compact" size="14" color="amber" half-increments readonly />
        <span class="text-caption text-grey">({{ product.reviewCount }})</span>
      </div>
    </v-card-item>

    <v-card-actions class="px-4 pb-4 pt-0">
      <v-btn block variant="tonal" color="primary" class="text-capitalize" @click.stop="handleAddToCart">
        <v-icon start size="18">mdi-cart-plus</v-icon> Thêm vào giỏ
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatPrice } from '@/utils/helpers'
import { useCartStore } from '@/stores/cart'
import { useNotificationStore } from '@/stores/notification'

const props = defineProps({
  product: { type: Object, required: true }
})

const cartStore = useCartStore()
const notify = useNotificationStore()
const wishlisted = ref(false)

const discountPercent = computed(() => {
  if (!props.product.originalPrice) return 0
  return Math.round((1 - props.product.price / props.product.originalPrice) * 100)
})

function handleAddToCart() {
  cartStore.addItem(props.product)
  notify.showSuccess(`Đã thêm "${props.product.name}" vào giỏ hàng!`)
}

function toggleWishlist() {
  wishlisted.value = !wishlisted.value
  notify.showInfo(wishlisted.value ? 'Đã thêm vào yêu thích' : 'Đã bỏ yêu thích')
}
</script>

<style scoped>
.product-actions {
  position: absolute;
  bottom: 8px;
  right: 8px;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.3s ease;
}
.product-card:hover .product-actions {
  opacity: 1;
  transform: translateY(0);
}
</style>
