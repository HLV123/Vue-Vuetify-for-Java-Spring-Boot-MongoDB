<template>
  <v-container style="max-width:1200px;" class="py-8">
    <v-breadcrumbs :items="[{title:'Trang chủ',to:'/'},{title:'Sản Phẩm Yêu Thích',disabled:true}]" class="px-0 mb-4">
      <template v-slot:divider><v-icon size="14">mdi-chevron-right</v-icon></template>
    </v-breadcrumbs>
    <div class="text-center py-16">
      <v-icon size="64" color="primary">mdi-heart</v-icon>
      <h1 class="text-h4 font-weight-bold font-display mt-4 mb-2">Sản Phẩm Yêu Thích</h1>
      <p class="text-body-1 text-grey mb-6">Danh sách sản phẩm đã lưu</p>
      <v-chip color="accent" variant="tonal">Trang này sẽ kết nối với Spring Boot API</v-chip>
    </div>
  </v-container>
</template>
<script setup>
</script>
