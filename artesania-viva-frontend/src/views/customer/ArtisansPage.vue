<template>
  <v-container style="max-width:1400px;" class="py-8">
    <div class="text-center mb-10">
      <div class="text-overline text-accent mb-2">Nghệ nhân</div>
      <h1 class="text-h3 font-weight-bold font-display mb-2">Gặp Gỡ Nghệ Nhân</h1>
      <p class="text-body-1 text-grey">Những con người tài hoa giữ hồn văn hóa dân tộc qua từng sản phẩm</p>
    </div>
    <v-row>
      <v-col v-for="artisan in artisans" :key="artisan.id" cols="12" sm="6" md="4">
        <v-card class="glass-card hover-lift text-center pa-6" @click="$router.push({name:'ArtisanProfile',params:{id:artisan.id}})">
          <v-avatar size="100" color="primary" class="mb-4">
            <v-img v-if="artisan.avatar" :src="artisan.avatar" />
            <span v-else class="text-h4">{{ artisan.name[0] }}</span>
          </v-avatar>
          <h3 class="text-h6 font-weight-bold font-display">{{ artisan.name }}</h3>
          <v-chip size="small" color="accent" variant="tonal" class="my-2">{{ artisan.ethnic }}</v-chip>
          <p class="text-body-2 text-grey">{{ artisan.village }}</p>
          <div class="d-flex justify-center ga-4 mt-3">
            <div class="text-center"><div class="font-weight-bold">{{ artisan.products }}</div><div class="text-caption text-grey">Sản phẩm</div></div>
            <div class="text-center"><div class="font-weight-bold text-amber">{{ artisan.rating }}★</div><div class="text-caption text-grey">Đánh giá</div></div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
const artisans = [
  { id:'art-1', name:'Mùa A Súa', ethnic:"H'Mong", village:'Tả Phìn, Sapa', products:12, rating:4.9, avatar:null },
  { id:'art-2', name:'Đàng Thị Hoa', ethnic:'Chăm', village:'Bàu Trúc, Ninh Thuận', products:8, rating:4.8, avatar:null },
  { id:'art-3', name:'Lò Thị Yến', ethnic:'Thái', village:'Mường Lay, Điện Biên', products:6, rating:5.0, avatar:null },
  { id:'art-4', name:'Lý Quầy Duyên', ethnic:'Dao Đỏ', village:'Tả Phìn, Sapa', products:10, rating:4.9, avatar:null },
  { id:'art-5', name:'Y Bluen', ethnic:'Ê Đê', village:'Buôn Ma Thuột, Đắk Lắk', products:15, rating:4.7, avatar:null },
  { id:'art-6', name:'Triệu Thị Mai', ethnic:'Dao Tiền', village:'Ba Vì, Hà Nội', products:4, rating:5.0, avatar:null },
]
</script>
