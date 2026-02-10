<template>
  <v-container fluid class="pa-6">
    <div class="d-flex justify-space-between align-center mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold font-display">Xưởng của {{ authStore.user?.artisanProfile?.shopName || 'Nghệ Nhân' }}</h1>
        <p class="text-body-2 text-grey">Tổng quan hoạt động kinh doanh</p>
      </div>
      <v-btn color="primary" prepend-icon="mdi-plus" :to="{ name: 'ArtisanProductNew' }" class="text-capitalize">
        Thêm Sản Phẩm Mới
      </v-btn>
    </div>

    <!-- Stats -->
    <v-row class="mb-6">
      <v-col v-for="stat in stats" :key="stat.label" cols="12" sm="6" md="3">
        <v-card class="glass-card pa-5 hover-lift">
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-caption text-grey mb-1">{{ stat.label }}</div>
              <div class="text-h4 font-weight-bold" :style="{ color: stat.color }">{{ stat.value }}</div>
              <div class="text-caption" :class="stat.trend > 0 ? 'text-green' : 'text-error'">
                <v-icon size="14">{{ stat.trend > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>
                {{ Math.abs(stat.trend) }}% so với tháng trước
              </div>
            </div>
            <v-avatar :color="stat.bgColor" size="48"><v-icon :color="stat.color">{{ stat.icon }}</v-icon></v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8">
        <!-- Products table -->
        <v-card class="glass-card">
          <v-tabs v-model="tab" bg-color="transparent">
            <v-tab value="products">Sản Phẩm</v-tab>
            <v-tab value="orders">Đơn Hàng Mới</v-tab>
            <v-tab value="custom">Yêu Cầu Custom</v-tab>
          </v-tabs>
          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="products">
                <v-table style="background: transparent;">
                  <thead><tr><th>Ảnh</th><th>Tên sản phẩm</th><th>Giá</th><th>Kho</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
                  <tbody>
                    <tr v-for="p in products" :key="p.id">
                      <td><v-img :src="p.image" width="50" height="50" cover class="rounded my-2" /></td>
                      <td>{{ p.name }} <v-chip v-if="p.isUnique" size="x-small" class="unique-badge ml-1">Độc bản</v-chip></td>
                      <td>{{ formatPrice(p.price) }}</td>
                      <td>{{ p.stock }}</td>
                      <td><v-chip color="green" size="small">Đang bán</v-chip></td>
                      <td>
                        <v-btn icon size="small" variant="text"><v-icon>mdi-pencil</v-icon></v-btn>
                        <v-btn icon size="small" variant="text" color="error"><v-icon>mdi-delete</v-icon></v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-window-item>
              <v-window-item value="orders">
                <v-table style="background: transparent;">
                  <thead><tr><th>Mã ĐH</th><th>Khách hàng</th><th>Sản phẩm</th><th>Tổng tiền</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
                  <tbody>
                    <tr v-for="o in recentOrders" :key="o.id">
                      <td class="font-weight-bold">#{{ o.id }}</td>
                      <td>{{ o.customer }}</td>
                      <td>{{ o.product }}</td>
                      <td>{{ formatPrice(o.total) }}</td>
                      <td><v-chip :color="o.statusColor" size="small">{{ o.status }}</v-chip></td>
                      <td>
                        <v-btn size="small" color="success" variant="tonal" class="mr-1 text-capitalize">Xác nhận</v-btn>
                        <v-btn size="small" color="error" variant="text" class="text-capitalize">Từ chối</v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-window-item>
              <v-window-item value="custom">
                <div class="pa-8 text-center text-grey">
                  <v-icon size="48" color="grey">mdi-palette</v-icon>
                  <p class="mt-2">Chưa có yêu cầu custom nào</p>
                </div>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <!-- Rating card -->
        <v-card class="glass-card pa-5 mb-4">
          <div class="text-caption text-grey mb-2">Đánh giá trung bình</div>
          <div class="d-flex align-center ga-2">
            <span class="text-h3 font-weight-bold text-amber">4.9</span>
            <div>
              <v-rating model-value="4.9" density="compact" size="18" color="amber" half-increments readonly />
              <div class="text-caption text-grey">Từ 150 đánh giá</div>
            </div>
          </div>
        </v-card>

        <!-- Recent activity -->
        <v-card class="glass-card pa-5">
          <div class="text-subtitle-1 font-weight-bold mb-3">Hoạt động gần đây</div>
          <v-timeline density="compact" side="end">
            <v-timeline-item v-for="a in activities" :key="a.text" :dot-color="a.color" size="x-small">
              <div class="text-body-2">{{ a.text }}</div>
              <div class="text-caption text-grey">{{ a.time }}</div>
            </v-timeline-item>
          </v-timeline>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useProductStore } from '@/stores/product'
import { formatPrice } from '@/utils/helpers'

const authStore = useAuthStore()
const productStore = useProductStore()
productStore.fetchProducts()

const tab = ref('products')
const products = ref(productStore.products.slice(0, 4))

const stats = [
  { label: 'Doanh thu tháng', value: '12,500,000đ', color: '#00D09C', bgColor: 'rgba(0,208,156,0.15)', icon: 'mdi-cash', trend: 15 },
  { label: 'Đơn hàng mới', value: '8', color: '#4C6EF5', bgColor: 'rgba(76,110,245,0.15)', icon: 'mdi-package', trend: 8 },
  { label: 'Sản phẩm', value: '12', color: '#F57C00', bgColor: 'rgba(245,124,0,0.15)', icon: 'mdi-shopping', trend: 2 },
  { label: 'Đánh giá TB', value: '4.9★', color: '#FFB300', bgColor: 'rgba(255,179,0,0.15)', icon: 'mdi-star', trend: 3 },
]

const recentOrders = [
  { id: 'AV-8823', customer: 'Nguyễn Thu Hà', product: 'Túi Thổ Cẩm H\'Mong', total: 1200000, status: 'Chờ xác nhận', statusColor: 'warning' },
  { id: 'AV-8819', customer: 'Trần Minh Đức', product: 'Vòng Tay Bạc Đen', total: 1800000, status: 'Đang giao', statusColor: 'info' },
]

const activities = [
  { text: 'Đơn hàng mới #AV-8823', color: 'primary', time: '5 phút trước' },
  { text: 'Đánh giá 5★ cho Túi Thổ Cẩm', color: 'amber', time: '2 giờ trước' },
  { text: 'Sản phẩm "Khăn Piêu" được duyệt', color: 'success', time: '1 ngày trước' },
  { text: 'Thanh toán 3,200,000đ đã nhận', color: 'accent', time: '2 ngày trước' },
]
</script>
