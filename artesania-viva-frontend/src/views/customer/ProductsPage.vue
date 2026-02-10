<template>
  <v-container style="max-width: 1400px;" class="py-8">
    <!-- Breadcrumb -->
    <v-breadcrumbs :items="breadcrumbs" class="px-0 mb-4">
      <template v-slot:divider><v-icon size="14">mdi-chevron-right</v-icon></template>
    </v-breadcrumbs>

    <v-row>
      <!-- SIDEBAR FILTERS -->
      <v-col cols="12" md="3">
        <v-card class="glass-card pa-5 position-sticky" style="top: 80px;">
          <div class="text-h6 mb-4 d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-filter-variant</v-icon> Bộ Lọc
          </div>

          <!-- Search -->
          <v-text-field
            v-model="productStore.filters.search"
            label="Tìm kiếm..."
            prepend-inner-icon="mdi-magnify"
            clearable
            hide-details
            class="mb-5"
            @update:model-value="debouncedSearch"
          />

          <!-- Category -->
          <div class="text-subtitle-2 text-primary mb-2 font-weight-bold">Danh Mục</div>
          <v-chip-group v-model="selectedCategory" column class="mb-4">
            <v-chip v-for="cat in productStore.categories" :key="cat.id" :value="cat.id" filter size="small" variant="outlined" color="primary">
              {{ cat.name }}
            </v-chip>
          </v-chip-group>

          <v-divider class="my-3" />

          <!-- Ethnic Group -->
          <div class="text-subtitle-2 text-primary mb-2 font-weight-bold">Dân Tộc</div>
          <v-checkbox
            v-for="ethnic in productStore.ethnicGroups" :key="ethnic"
            :label="ethnic"
            :model-value="productStore.filters.ethnicGroup === ethnic"
            @update:model-value="val => productStore.setFilter('ethnicGroup', val ? ethnic : null)"
            density="compact"
            hide-details
            color="accent"
          />

          <v-divider class="my-3" />

          <!-- Price Range -->
          <div class="text-subtitle-2 text-primary mb-2 font-weight-bold">Khoảng Giá</div>
          <v-range-slider
            v-model="priceRange"
            :min="0"
            :max="10000000"
            :step="100000"
            color="primary"
            track-color="grey-darken-3"
            hide-details
            class="mb-2"
          />
          <div class="d-flex justify-space-between text-caption text-grey">
            <span>{{ formatPrice(priceRange[0]) }}</span>
            <span>{{ formatPrice(priceRange[1]) }}</span>
          </div>

          <v-divider class="my-3" />

          <!-- Unique only -->
          <v-switch
            v-model="uniqueOnly"
            label="Chỉ sản phẩm Độc Bản"
            color="warning"
            hide-details
            density="compact"
          />

          <v-btn block variant="tonal" color="grey" class="mt-4 text-capitalize" @click="resetFilters">
            <v-icon start>mdi-refresh</v-icon> Xóa bộ lọc
          </v-btn>
        </v-card>
      </v-col>

      <!-- PRODUCT GRID -->
      <v-col cols="12" md="9">
        <div class="d-flex flex-wrap justify-space-between align-center mb-6 ga-3">
          <div>
            <h1 class="text-h5 font-weight-bold font-display">
              {{ pageTitle }}
            </h1>
            <p class="text-body-2 text-grey">{{ productStore.filteredProducts.length }} sản phẩm</p>
          </div>
          <div class="d-flex align-center ga-3">
            <v-select
              v-model="productStore.filters.sortBy"
              :items="sortOptions"
              item-title="text"
              item-value="value"
              hide-details
              style="max-width: 200px"
              density="compact"
            />
            <v-btn-toggle v-model="viewMode" mandatory density="compact" color="primary" variant="outlined">
              <v-btn value="grid" icon size="small"><v-icon>mdi-view-grid</v-icon></v-btn>
              <v-btn value="list" icon size="small"><v-icon>mdi-view-list</v-icon></v-btn>
            </v-btn-toggle>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="productStore.loading" class="d-flex justify-center py-16">
          <v-progress-circular indeterminate color="primary" size="48" />
        </div>

        <!-- Empty state -->
        <v-card v-else-if="productStore.filteredProducts.length === 0" class="glass-card pa-12 text-center">
          <v-icon size="64" color="grey">mdi-magnify-close</v-icon>
          <h3 class="text-h6 mt-4 mb-2">Không tìm thấy sản phẩm</h3>
          <p class="text-body-2 text-grey mb-4">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          <v-btn variant="tonal" color="primary" @click="resetFilters" class="text-capitalize">Xóa bộ lọc</v-btn>
        </v-card>

        <!-- Grid view -->
        <v-row v-else-if="viewMode === 'grid'">
          <v-col v-for="product in paginatedProducts" :key="product.id" cols="12" sm="6" lg="4">
            <ProductCard :product="product" />
          </v-col>
        </v-row>

        <!-- List view -->
        <div v-else class="d-flex flex-column ga-3">
          <v-card v-for="product in paginatedProducts" :key="product.id" class="glass-card d-flex cursor-pointer hover-lift"
            @click="$router.push({ name: 'ProductDetail', params: { id: product.id } })">
            <v-img :src="product.image" width="180" height="140" cover class="rounded-s-lg flex-shrink-0" />
            <div class="pa-4 flex-grow-1 d-flex flex-column">
              <div class="d-flex align-center ga-2 mb-1">
                <v-chip size="x-small" color="accent" variant="tonal">{{ product.ethnicGroup }}</v-chip>
                <v-chip v-if="product.isUnique" size="x-small" class="unique-badge">Độc Bản</v-chip>
              </div>
              <h3 class="text-subtitle-1 font-weight-bold mb-1">{{ product.name }}</h3>
              <p class="text-caption text-grey mb-auto">{{ product.artisanName }} — {{ product.artisanVillage }}</p>
              <div class="d-flex justify-space-between align-center">
                <span class="text-h6 font-weight-bold" style="color: #4C6EF5;">{{ formatPrice(product.price) }}</span>
                <v-btn variant="tonal" color="primary" size="small" class="text-capitalize" @click.stop="addToCart(product)">
                  <v-icon start size="16">mdi-cart-plus</v-icon> Thêm
                </v-btn>
              </div>
            </div>
          </v-card>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="d-flex justify-center mt-8">
          <v-pagination v-model="currentPage" :length="totalPages" color="primary" rounded="lg" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import { useNotificationStore } from '@/stores/notification'
import { formatPrice, debounce } from '@/utils/helpers'
import ProductCard from '@/components/common/ProductCard.vue'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const notify = useNotificationStore()

const viewMode = ref('grid')
const currentPage = ref(1)
const itemsPerPage = 12

const priceRange = ref([0, 10000000])
const uniqueOnly = ref(false)
const selectedCategory = ref(null)

const sortOptions = [
  { text: 'Mới nhất', value: 'newest' },
  { text: 'Giá thấp → cao', value: 'price-asc' },
  { text: 'Giá cao → thấp', value: 'price-desc' },
  { text: 'Bán chạy', value: 'popular' },
  { text: 'Đánh giá cao', value: 'rating' }
]

const breadcrumbs = computed(() => [
  { title: 'Trang chủ', to: '/' },
  { title: pageTitle.value, disabled: true }
])

const pageTitle = computed(() => {
  if (route.query.q) return `Kết quả cho "${route.query.q}"`
  if (route.query.category) {
    const cat = productStore.categories.find(c => c.id === route.query.category)
    return cat ? cat.name : 'Sản Phẩm'
  }
  return 'Tất Cả Sản Phẩm'
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return productStore.filteredProducts.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => Math.ceil(productStore.filteredProducts.length / itemsPerPage))

const debouncedSearch = debounce(() => {}, 300)

watch(priceRange, (val) => {
  productStore.setFilter('minPrice', val[0])
  productStore.setFilter('maxPrice', val[1])
})

watch(uniqueOnly, (val) => {
  productStore.setFilter('isUnique', val ? true : null)
})

watch(selectedCategory, (val) => {
  productStore.setFilter('categoryId', val ?? null)
})

watch(() => route.query, (q) => {
  if (q.q) productStore.setFilter('search', q.q)
  if (q.category) selectedCategory.value = q.category
}, { immediate: true })

function resetFilters() {
  productStore.resetFilters()
  priceRange.value = [0, 10000000]
  uniqueOnly.value = false
  selectedCategory.value = null
  currentPage.value = 1
}

function addToCart(product) {
  cartStore.addItem(product)
  notify.showSuccess(`Đã thêm "${product.name}" vào giỏ hàng!`)
}

onMounted(async () => {
  await productStore.fetchProducts()
  await productStore.fetchCategories()
})
</script>
