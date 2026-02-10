<template>
  <v-container fluid class="pa-6">
    <h1 class="text-h4 font-weight-bold font-display mb-6">Quản Trị Hệ Thống</h1>

    <!-- Top Stats -->
    <v-row class="mb-6">
      <v-col v-for="stat in topStats" :key="stat.label" cols="12" sm="6" md="3">
        <v-card class="glass-card pa-5 hover-lift">
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-caption text-grey">{{ stat.label }}</div>
              <div class="text-h4 font-weight-bold mt-1" :style="{ color: stat.color }">{{ stat.value }}</div>
              <div class="text-caption text-green"><v-icon size="14">mdi-arrow-up</v-icon> {{ stat.change }}</div>
            </div>
            <v-avatar :color="stat.bgColor" size="48"><v-icon :color="stat.color">{{ stat.icon }}</v-icon></v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8">
        <!-- Revenue chart placeholder -->
        <v-card class="glass-card pa-5 mb-6">
          <div class="d-flex justify-space-between mb-4">
            <div class="text-h6 font-weight-bold">Biểu đồ doanh thu toàn sàn</div>
            <v-btn size="small" variant="tonal" class="text-capitalize">Xuất báo cáo</v-btn>
          </div>
          <div class="d-flex align-end justify-space-around" style="height: 250px;">
            <div v-for="(h, i) in chartData" :key="i"
              :style="{ height: h + '%', width: '8%', background: 'linear-gradient(to top, #4C6EF5, #704CF5)', borderRadius: '6px' }"
              class="position-relative hover-lift" />
          </div>
          <div class="d-flex justify-space-around mt-2 text-caption text-grey">
            <span v-for="d in ['T2','T3','T4','T5','T6','T7','CN']" :key="d">{{ d }}</span>
          </div>
        </v-card>

        <!-- Pending products -->
        <v-card class="glass-card">
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Sản phẩm chờ duyệt</span>
            <v-chip color="warning" size="small">{{ pendingProducts.length }} chờ duyệt</v-chip>
          </v-card-title>
          <v-table style="background: transparent;">
            <thead><tr><th>Sản phẩm</th><th>Nghệ nhân</th><th>Ngày đăng</th><th>Giá</th><th>Thao tác</th></tr></thead>
            <tbody>
              <tr v-for="p in pendingProducts" :key="p.name">
                <td>{{ p.name }}</td>
                <td>{{ p.artisan }}</td>
                <td>{{ p.date }}</td>
                <td>{{ p.price }}</td>
                <td>
                  <v-btn size="small" color="success" variant="tonal" class="mr-1 text-capitalize">Duyệt</v-btn>
                  <v-btn size="small" color="error" variant="text" class="text-capitalize">Từ chối</v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <!-- System status -->
        <v-card class="glass-card pa-5 mb-4">
          <div class="text-subtitle-1 font-weight-bold mb-4">Trạng thái hệ thống</div>
          <div class="mb-4">
            <div class="d-flex justify-space-between text-body-2 mb-1">
              <span>Server Load</span><span class="text-green">Ổn định</span>
            </div>
            <v-progress-linear model-value="25" color="success" height="8" rounded />
          </div>
          <div class="mb-4">
            <div class="d-flex justify-space-between text-body-2 mb-1">
              <span>Database</span><span class="text-green">MongoDB OK</span>
            </div>
            <v-progress-linear model-value="40" color="primary" height="8" rounded />
          </div>
          <div>
            <div class="d-flex justify-space-between text-body-2 mb-1">
              <span>API Response</span><span>120ms</span>
            </div>
            <v-progress-linear model-value="15" color="info" height="8" rounded />
          </div>
        </v-card>

        <!-- User stats -->
        <v-card class="glass-card pa-5 mb-4">
          <div class="text-subtitle-1 font-weight-bold mb-3">Người dùng hôm nay</div>
          <div class="d-flex justify-space-between text-body-2 mb-1"><span>Đăng ký mới</span><span class="font-weight-bold">+124</span></div>
          <v-progress-linear model-value="70" color="primary" height="8" rounded class="mb-3" />
          <div class="d-flex justify-space-between text-body-2 mb-1"><span>Nghệ nhân mới</span><span class="font-weight-bold">+3</span></div>
          <v-progress-linear model-value="30" color="accent" height="8" rounded />
        </v-card>

        <!-- Recent activity -->
        <v-card class="glass-card pa-5">
          <div class="text-subtitle-1 font-weight-bold mb-3">Hoạt động gần đây</div>
          <v-list bg-color="transparent" density="compact">
            <v-list-item prepend-icon="mdi-account-plus" title="Nghệ nhân mới đăng ký" subtitle="Làng gốm Bàu Trúc" />
            <v-list-item prepend-icon="mdi-cash" title="Giao dịch lớn #9932" subtitle="5,000,000đ - Đã thanh toán" />
            <v-list-item prepend-icon="mdi-alert" title="Báo cáo vi phạm" subtitle="Comment spam SP #221" class="text-error" />
            <v-list-item prepend-icon="mdi-check-circle" title="Sản phẩm #445 đã duyệt" subtitle="Khăn Piêu Thái Đen" />
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const topStats = [
  { label: 'Tổng doanh thu', value: '156M', color: '#00D09C', bgColor: 'rgba(0,208,156,0.15)', icon: 'mdi-cash-multiple', change: '+23% tháng này' },
  { label: 'Đơn hàng', value: '1,247', color: '#4C6EF5', bgColor: 'rgba(76,110,245,0.15)', icon: 'mdi-package-variant', change: '+15% tháng này' },
  { label: 'Người dùng', value: '8,432', color: '#F57C00', bgColor: 'rgba(245,124,0,0.15)', icon: 'mdi-account-group', change: '+124 hôm nay' },
  { label: 'Nghệ nhân', value: '203', color: '#FFB300', bgColor: 'rgba(255,179,0,0.15)', icon: 'mdi-store', change: '+3 tuần này' },
]

const chartData = [40, 60, 45, 80, 55, 90, 70]

const pendingProducts = [
  { name: 'Khăn Piêu Thái Đen', artisan: 'Lò Thị Mẹt', date: '09/02/2026', price: '450,000đ' },
  { name: 'Gùi Tre Tây Nguyên', artisan: 'Y Bluen', date: '09/02/2026', price: '680,000đ' },
  { name: 'Nhẫn Bạc Chạm Khắc', artisan: 'Lý Quầy Duyên', date: '08/02/2026', price: '1,200,000đ' },
]
</script>
