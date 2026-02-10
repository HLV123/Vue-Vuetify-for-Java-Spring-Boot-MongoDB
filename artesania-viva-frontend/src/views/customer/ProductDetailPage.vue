<template>
  <div>
    <v-container v-if="loading" class="py-16 text-center">
      <v-progress-circular indeterminate color="primary" size="48" />
    </v-container>

    <v-container v-else-if="product" style="max-width: 1400px;" class="py-8">
      <v-breadcrumbs :items="breadcrumbs" class="px-0 mb-4">
        <template v-slot:divider><v-icon size="14">mdi-chevron-right</v-icon></template>
      </v-breadcrumbs>

      <v-row>
        <!-- Images -->
        <v-col cols="12" md="6">
          <v-card class="glass-card rounded-xl overflow-hidden" elevation="8">
            <v-img :src="mainImage" height="500" cover />
          </v-card>
          <v-row class="mt-3" v-if="product.images?.length > 1">
            <v-col v-for="(img, i) in product.images" :key="i" cols="3">
              <v-card class="cursor-pointer rounded-lg" :class="{ 'border-glow': mainImage === img }" elevation="0"
                @click="mainImage = img">
                <v-img :src="img" height="80" cover class="rounded-lg" />
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <!-- Info -->
        <v-col cols="12" md="6" class="pl-md-10">
          <div class="d-flex align-center ga-2 mb-3">
            <v-chip color="accent" size="small">{{ product.ethnicGroup }}</v-chip>
            <v-chip v-if="product.isUnique" class="unique-badge" size="small">
              <v-icon start size="14">mdi-star-four-points</v-icon> Chỉ có 1 chiếc
            </v-chip>
            <v-chip v-if="product.originalPrice" color="error" size="small">
              -{{ discountPercent }}%
            </v-chip>
          </div>

          <h1 class="text-h4 font-weight-bold font-display mb-2">{{ product.name }}</h1>

          <div class="d-flex align-center ga-3 mb-4">
            <v-rating :model-value="product.rating" density="compact" size="18" color="amber" half-increments readonly />
            <span class="text-body-2 text-grey">{{ product.rating }}/5 ({{ product.reviewCount }} đánh giá)</span>
            <span class="text-body-2 text-grey">| Đã bán {{ product.sold }}</span>
          </div>

          <div class="d-flex align-center ga-3 mb-6">
            <span class="text-h3 font-weight-bold" style="color: #4C6EF5;">{{ formatPrice(product.price) }}</span>
            <span v-if="product.originalPrice" class="text-h5 text-grey text-decoration-line-through">{{ formatPrice(product.originalPrice) }}</span>
          </div>

          <v-divider class="mb-6" />

          <!-- Artisan info -->
          <v-card class="glass-card pa-4 rounded-lg mb-6 d-flex align-center cursor-pointer hover-lift"
            @click="$router.push({ name: 'ArtisanProfile', params: { id: product.artisanId } })">
            <v-avatar size="56" color="primary" class="mr-4">
              <span class="text-h6">{{ product.artisanName?.[0] }}</span>
            </v-avatar>
            <div class="flex-grow-1">
              <div class="text-subtitle-1 font-weight-bold">Nghệ nhân {{ product.artisanName }}</div>
              <div class="text-caption text-grey">{{ product.artisanVillage }}</div>
              <v-btn variant="text" density="compact" color="primary" class="px-0 text-capitalize mt-1" size="small">
                Xem hồ sơ <v-icon end size="14">mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-card>

          <p class="text-body-1 mb-6" style="color: #9BA4B5; line-height: 1.8;">{{ product.description }}</p>

          <!-- Quantity + Add to cart -->
          <div class="d-flex align-center ga-3 mb-6">
            <div v-if="!product.isUnique" class="d-flex align-center">
              <v-btn icon size="small" variant="tonal" @click="qty = Math.max(1, qty - 1)"><v-icon>mdi-minus</v-icon></v-btn>
              <span class="mx-4 text-h6">{{ qty }}</span>
              <v-btn icon size="small" variant="tonal" @click="qty = Math.min(product.stock, qty + 1)"><v-icon>mdi-plus</v-icon></v-btn>
              <span class="text-caption text-grey ml-3">Còn {{ product.stock }} sản phẩm</span>
            </div>
            <div v-else class="text-body-2 text-warning">
              <v-icon size="16" color="warning">mdi-alert</v-icon> Sản phẩm độc bản — chỉ còn 1 chiếc duy nhất
            </div>
          </div>

          <div class="d-flex ga-3 mb-6">
            <v-btn size="x-large" color="primary" class="flex-grow-1 text-capitalize" rounded="xl" @click="handleAddToCart">
              <v-icon start>mdi-cart-plus</v-icon> Thêm vào giỏ hàng
            </v-btn>
            <v-btn size="x-large" variant="outlined" color="secondary" class="text-capitalize" rounded="xl">
              Đặt hàng Custom
            </v-btn>
          </div>

          <div class="d-flex ga-3 mb-6">
            <v-btn variant="text" class="text-capitalize" @click="toggleWishlist">
              <v-icon start :color="wishlisted ? 'error' : ''">{{ wishlisted ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
              Yêu thích
            </v-btn>
            <v-btn variant="text" class="text-capitalize">
              <v-icon start>mdi-share-variant</v-icon> Chia sẻ
            </v-btn>
          </div>

          <!-- Specs -->
          <v-expansion-panels variant="accordion" class="glass-card">
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-icon class="mr-2" size="20">mdi-ruler</v-icon> Thông số kỹ thuật
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div class="d-flex flex-column ga-2 text-body-2" style="color: #9BA4B5;">
                  <div><strong>Chất liệu:</strong> {{ product.material }}</div>
                  <div><strong>Kích thước:</strong> {{ product.dimensions }}</div>
                  <div><strong>Trọng lượng:</strong> {{ product.weight }}</div>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-icon class="mr-2" size="20">mdi-hammer-wrench</v-icon> Quy trình chế tác
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-2" style="color: #9BA4B5;">{{ product.craftProcess }}</p>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-icon class="mr-2" size="20">mdi-shield-check</v-icon> Bảo hành & Đổi trả
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-2" style="color: #9BA4B5;">{{ product.warranty }}</p>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>

      <!-- Reviews section -->
      <section class="mt-12">
        <h2 class="text-h5 font-weight-bold font-display mb-6">Đánh Giá Sản Phẩm</h2>
        <v-card class="glass-card pa-6 mb-6">
          <div class="d-flex align-center ga-6">
            <div class="text-center">
              <div class="text-h2 font-weight-bold" style="color: #FFB300;">{{ product.rating }}</div>
              <v-rating :model-value="product.rating" density="compact" size="20" color="amber" half-increments readonly />
              <div class="text-caption text-grey mt-1">{{ product.reviewCount }} đánh giá</div>
            </div>
            <v-divider vertical class="mx-4" />
            <div class="flex-grow-1">
              <div v-for="star in [5,4,3,2,1]" :key="star" class="d-flex align-center ga-2 mb-1">
                <span class="text-caption" style="width: 20px;">{{ star }}★</span>
                <v-progress-linear :model-value="getStarPercent(star)" color="amber" height="8" rounded bg-color="grey-darken-3" style="max-width: 300px;" />
                <span class="text-caption text-grey">{{ getStarCount(star) }}</span>
              </div>
            </div>
          </div>
        </v-card>

        <!-- Sample reviews -->
        <v-card v-for="review in sampleReviews" :key="review.id" class="glass-card pa-4 mb-3">
          <div class="d-flex align-center mb-2">
            <v-avatar color="primary" size="36" class="mr-3">
              <span class="text-caption">{{ review.name[0] }}</span>
            </v-avatar>
            <div>
              <div class="text-subtitle-2 font-weight-bold">{{ review.name }}</div>
              <div class="d-flex align-center ga-2">
                <v-rating :model-value="review.rating" density="compact" size="14" color="amber" readonly />
                <span class="text-caption text-grey">{{ review.date }}</span>
              </div>
            </div>
          </div>
          <p class="text-body-2" style="color: #9BA4B5;">{{ review.comment }}</p>
        </v-card>
      </section>

      <!-- Related products -->
      <section class="mt-12">
        <h2 class="text-h5 font-weight-bold font-display mb-6">Sản Phẩm Tương Tự</h2>
        <v-row>
          <v-col v-for="p in relatedProducts" :key="p.id" cols="12" sm="6" md="3">
            <ProductCard :product="p" />
          </v-col>
        </v-row>
      </section>
    </v-container>

    <!-- Not found -->
    <v-container v-else class="py-16 text-center">
      <v-icon size="64" color="grey">mdi-alert-circle-outline</v-icon>
      <h2 class="text-h5 mt-4">Không tìm thấy sản phẩm</h2>
      <v-btn :to="{ name: 'Products' }" color="primary" class="mt-4 text-capitalize">Quay lại cửa hàng</v-btn>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import { useNotificationStore } from '@/stores/notification'
import { formatPrice } from '@/utils/helpers'
import ProductCard from '@/components/common/ProductCard.vue'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const notify = useNotificationStore()

const loading = ref(true)
const product = ref(null)
const mainImage = ref('')
const qty = ref(1)
const wishlisted = ref(false)

const discountPercent = computed(() => {
  if (!product.value?.originalPrice) return 0
  return Math.round((1 - product.value.price / product.value.originalPrice) * 100)
})

const breadcrumbs = computed(() => [
  { title: 'Trang chủ', to: '/' },
  { title: 'Sản phẩm', to: '/products' },
  { title: product.value?.name || '', disabled: true }
])

const relatedProducts = computed(() =>
  productStore.products.filter(p => p.id !== product.value?.id && p.categoryId === product.value?.categoryId).slice(0, 4)
)

const sampleReviews = [
  { id: 1, name: 'Nguyễn Thu Hà', rating: 5, date: '05/02/2026', comment: 'Sản phẩm rất đẹp, chất lượng tuyệt vời! Đóng gói cẩn thận, giao hàng nhanh. Rất hài lòng!' },
  { id: 2, name: 'Trần Minh Đức', rating: 4, date: '01/02/2026', comment: 'Hoa văn rất tinh tế, thấy rõ bàn tay nghệ nhân. Mình mua làm quà tặng, người nhận rất thích.' },
  { id: 3, name: 'Lê Thanh Vân', rating: 5, date: '28/01/2026', comment: 'Mua lần 2 rồi. Chất lượng luôn nhất quán. Cám ơn nghệ nhân đã tạo ra sản phẩm đẹp!' }
]

function getStarPercent(star) {
  const percents = { 5: 70, 4: 20, 3: 7, 2: 2, 1: 1 }
  return percents[star]
}
function getStarCount(star) {
  const rc = product.value?.reviewCount || 0
  return Math.round(rc * getStarPercent(star) / 100)
}

function handleAddToCart() {
  for (let i = 0; i < qty.value; i++) cartStore.addItem(product.value)
  notify.showSuccess(`Đã thêm "${product.value.name}" vào giỏ hàng!`)
}

function toggleWishlist() {
  wishlisted.value = !wishlisted.value
  notify.showInfo(wishlisted.value ? 'Đã thêm vào yêu thích' : 'Đã bỏ yêu thích')
}

async function loadProduct() {
  loading.value = true
  await productStore.fetchProducts()
  const p = await productStore.fetchProductById(route.params.id)
  product.value = p
  mainImage.value = p?.images?.[0] || p?.image || ''
  loading.value = false
}

onMounted(loadProduct)
watch(() => route.params.id, loadProduct)
</script>
