<template>
  <div>
    <!-- HERO SECTION -->
    <section class="hero-section pb-10">
      <v-container style="max-width: 1400px;">
        <v-row align="center" class="py-md-16 py-8">
          <v-col cols="12" md="6" class="pr-md-10">
            <div class="text-overline text-accent mb-2 animate-fade-in-up" style="letter-spacing: 0.15em;">
              Bảo tồn văn hóa — Kết nối cộng đồng
            </div>
            <h1 class="font-display mb-4 animate-fade-in-up stagger-1" style="font-size: clamp(2.2rem, 5vw, 3.5rem); line-height: 1.15;">
              Tinh Hoa Thủ Công<br>
              <span class="gradient-text">Độc Bản &amp; Nguyên Bản</span>
            </h1>
            <p class="text-body-1 mb-6 animate-fade-in-up stagger-2" style="color: #9BA4B5; max-width: 520px; line-height: 1.7;">
              Khám phá những kiệt tác thủ công từ các nghệ nhân dân tộc thiểu số Việt Nam.
              Mỗi sản phẩm là một câu chuyện, một nét văn hóa được gìn giữ qua hàng thế kỷ.
            </p>
            <div class="d-flex flex-wrap ga-3 mb-10 animate-fade-in-up stagger-3">
              <v-btn size="x-large" color="primary" class="text-capitalize" elevation="8" rounded="xl" :to="{ name: 'Products' }">
                <v-icon start>mdi-compass</v-icon> Khám Phá Ngay
              </v-btn>
              <v-btn size="x-large" variant="outlined" class="text-capitalize" rounded="xl" :to="{ name: 'About' }">
                Về Dự Án
              </v-btn>
            </div>
            <div class="d-flex ga-8 animate-fade-in-up stagger-4">
              <div v-for="stat in heroStats" :key="stat.label">
                <div class="text-h4 font-weight-bold">{{ stat.value }}</div>
                <div class="text-caption" style="color: #6B7280;">{{ stat.label }}</div>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="animate-fade-in-up stagger-3">
            <v-card class="glass-card rounded-xl pa-2" elevation="12">
              <v-img src="/images/hero-banner.jpg" cover height="460" class="rounded-lg">
                <div class="d-flex flex-column fill-height justify-end pa-4">
                  <v-chip class="unique-badge align-self-start mb-2" size="small">
                    <v-icon start size="14">mdi-star-four-points</v-icon> Duy Nhất 1 Chiếc
                  </v-chip>
                  <div class="glass-card pa-4 rounded-lg">
                    <div class="text-h6 font-display">Áo Chàm Thêu Tay H'Mong</div>
                    <div class="text-subtitle-2" style="color: #9BA4B5;">Nghệ nhân: Mùa A Súa — Hà Giang</div>
                  </div>
                </div>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- CATEGORIES SECTION -->
    <section class="section-padding">
      <v-container style="max-width: 1400px;">
        <div class="text-center mb-10">
          <div class="text-overline text-accent mb-2" style="letter-spacing: 0.15em;">Bộ sưu tập</div>
          <h2 class="text-h3 font-weight-bold font-display mb-2">Khám Phá Theo Danh Mục</h2>
          <p class="text-body-1" style="color: #6B7280;">Từ vải dệt thổ cẩm đến gốm sứ cổ truyền, mỗi danh mục mang một câu chuyện riêng.</p>
        </div>

        <v-row>
          <v-col v-for="cat in categories" :key="cat.id" cols="6" md="3">
            <v-card class="category-card rounded-xl cursor-pointer" elevation="0" height="280"
              @click="$router.push({ name: 'Products', query: { category: cat.id } })">
              <v-img :src="cat.image" cover height="280" />
              <div class="category-content">
                <h3 class="text-h6 font-weight-bold font-display mb-1">{{ cat.name }}</h3>
                <p class="text-caption" style="color: #ccc;">{{ cat.productCount }}+ sản phẩm</p>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- FEATURED PRODUCTS SECTION -->
    <section class="section-padding" style="background: linear-gradient(180deg, transparent, rgba(76, 110, 245, 0.03), transparent);">
      <v-container style="max-width: 1400px;">
        <div class="d-flex justify-space-between align-center mb-8">
          <div>
            <div class="text-overline text-accent mb-1" style="letter-spacing: 0.15em;">Nổi bật</div>
            <h2 class="text-h4 font-weight-bold font-display">Sản Phẩm Đặc Sắc</h2>
          </div>
          <v-btn variant="text" color="primary" :to="{ name: 'Products' }" class="text-capitalize d-none d-sm-flex">
            Xem tất cả <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </div>

        <v-row>
          <v-col v-for="product in featuredProducts" :key="product.id" cols="12" sm="6" md="4" lg="3">
            <ProductCard :product="product" />
          </v-col>
        </v-row>

        <div class="text-center mt-6 d-sm-none">
          <v-btn variant="outlined" color="primary" :to="{ name: 'Products' }" class="text-capitalize">
            Xem tất cả sản phẩm <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </v-container>
    </section>

    <!-- ARTISAN STORY SECTION -->
    <section class="section-padding">
      <v-container style="max-width: 1400px;">
        <v-row align="center">
          <v-col cols="12" md="6">
            <v-card class="rounded-xl overflow-hidden" elevation="12">
              <v-img src="/images/artisan-story.jpg" height="500" cover />
            </v-card>
          </v-col>
          <v-col cols="12" md="6" class="pl-md-12">
            <div class="text-overline text-accent mb-2" style="letter-spacing: 0.15em;">Câu chuyện nghệ nhân</div>
            <h2 class="text-h3 font-weight-bold font-display mb-4">Đôi Bàn Tay<br><span class="gradient-text">Giữ Hồn Văn Hóa</span></h2>
            <p class="text-body-1 mb-4" style="color: #9BA4B5; line-height: 1.8;">
              Mỗi sản phẩm trên Artesanía Viva đều được tạo ra bởi những nghệ nhân tài hoa, 
              người đã dành cả đời gìn giữ và phát triển nghề thủ công truyền thống của dân tộc mình.
            </p>
            <p class="text-body-1 mb-6" style="color: #9BA4B5; line-height: 1.8;">
              Từ những đôi tay khéo léo dệt nên tấm thổ cẩm, đến nghệ thuật nặn gốm không bàn xoay hàng ngàn năm tuổi — 
              tất cả đều hội tụ tại đây để kể cho bạn nghe những câu chuyện đặc biệt nhất.
            </p>
            <div class="d-flex ga-3">
              <v-btn color="primary" size="large" class="text-capitalize" rounded="xl" :to="{ name: 'Artisans' }">
                <v-icon start>mdi-account-group</v-icon> Gặp Gỡ Nghệ Nhân
              </v-btn>
              <v-btn variant="outlined" size="large" class="text-capitalize" rounded="xl" :to="{ name: 'Stories' }">
                Đọc Câu Chuyện
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- WHY CHOOSE US -->
    <section class="section-padding" style="background: linear-gradient(180deg, transparent, rgba(0, 208, 156, 0.03), transparent);">
      <v-container style="max-width: 1400px;">
        <div class="text-center mb-10">
          <h2 class="text-h3 font-weight-bold font-display mb-2">Tại Sao Chọn Artesanía Viva?</h2>
        </div>
        <v-row>
          <v-col v-for="(feature, i) in features" :key="i" cols="12" sm="6" md="3">
            <v-card class="glass-card pa-6 text-center h-100 hover-lift" elevation="0">
              <v-avatar :color="feature.color" size="64" class="mb-4">
                <v-icon size="32" color="white">{{ feature.icon }}</v-icon>
              </v-avatar>
              <h3 class="text-h6 font-weight-bold mb-2">{{ feature.title }}</h3>
              <p class="text-body-2" style="color: #9BA4B5;">{{ feature.desc }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- CULTURE BANNER -->
    <section class="section-padding">
      <v-container style="max-width: 1400px;">
        <v-card class="rounded-xl overflow-hidden" elevation="12">
          <v-img src="/images/about-culture.jpg" height="400" cover class="d-flex align-center">
            <div style="background: linear-gradient(90deg, rgba(11,20,38,0.9) 0%, rgba(11,20,38,0.4) 100%); position:absolute;inset:0;" />
            <v-container class="position-relative" style="z-index:1;">
              <v-row>
                <v-col cols="12" md="7">
                  <div class="text-overline text-accent mb-2">Sứ mệnh của chúng tôi</div>
                  <h2 class="text-h3 font-weight-bold font-display mb-4">Kết Nối Văn Hóa<br>Với Thế Giới Hiện Đại</h2>
                  <p class="text-body-1 mb-6" style="color: #ccc;">
                    Artesanía Viva không chỉ là nơi mua sắm — đó là cầu nối giữa di sản văn hóa dân tộc và cuộc sống đương đại.
                  </p>
                  <v-btn color="primary" size="large" class="text-capitalize" rounded="xl" :to="{ name: 'About' }">
                    Tìm Hiểu Thêm <v-icon end>mdi-arrow-right</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-img>
        </v-card>
      </v-container>
    </section>

    <!-- NEW ARRIVALS -->
    <section class="section-padding">
      <v-container style="max-width: 1400px;">
        <div class="d-flex justify-space-between align-center mb-8">
          <div>
            <div class="text-overline text-accent mb-1" style="letter-spacing: 0.15em;">Mới về</div>
            <h2 class="text-h4 font-weight-bold font-display">Sản Phẩm Mới Nhất</h2>
          </div>
          <v-btn variant="text" color="primary" :to="{ name: 'Products' }" class="text-capitalize">
            Xem tất cả <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
        <v-row>
          <v-col v-for="product in newProducts" :key="product.id" cols="12" sm="6" md="4" lg="3">
            <ProductCard :product="product" />
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import ProductCard from '@/components/common/ProductCard.vue'

const productStore = useProductStore()

onMounted(async () => {
  await productStore.fetchProducts()
  await productStore.fetchFeatured()
  await productStore.fetchCategories()
})

const categories = computed(() => productStore.categories)
const featuredProducts = computed(() => productStore.featuredProducts.slice(0, 4))
const newProducts = computed(() =>
  [...productStore.products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4)
)

const heroStats = [
  { value: '50+', label: 'Làng nghề' },
  { value: '200+', label: 'Nghệ nhân' },
  { value: '1.5k', label: 'Sản phẩm độc bản' }
]

const features = [
  { icon: 'mdi-hand-heart', title: '100% Thủ Công', desc: 'Mỗi sản phẩm được tạo hoàn toàn bằng tay bởi nghệ nhân lành nghề', color: 'primary' },
  { icon: 'mdi-certificate', title: 'Chứng Nhận Nguồn Gốc', desc: 'Truy xuất nguồn gốc rõ ràng, biết rõ nghệ nhân và làng nghề', color: 'accent' },
  { icon: 'mdi-shield-check', title: 'Bảo Hành Trọn Đời', desc: 'Cam kết bảo hành và hỗ trợ sửa chữa cho các sản phẩm thủ công', color: 'secondary' },
  { icon: 'mdi-heart-pulse', title: 'Tác Động Xã Hội', desc: '80% doanh thu trực tiếp đến tay nghệ nhân và cộng đồng địa phương', color: 'error' }
]
</script>
