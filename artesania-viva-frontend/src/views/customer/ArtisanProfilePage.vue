<template>
  <v-container style="max-width:1200px;" class="py-8">
    <v-breadcrumbs :items="[{title:'Trang chủ',to:'/'},{title:'Hồ Sơ Nghệ Nhân',disabled:true}]" class="px-0 mb-4">
      <template v-slot:divider><v-icon size="14">mdi-chevron-right</v-icon></template>
    </v-breadcrumbs>
    <div class="text-center py-16">
      <v-icon size="64" color="primary">mdi-account-star</v-icon>
      <h1 class="text-h4 font-weight-bold font-display mt-4 mb-2">Hồ Sơ Nghệ Nhân</h1>
      <p class="text-body-1 text-grey mb-6">Thông tin chi tiết về nghệ nhân và xưởng thủ công</p>
      <v-chip color="accent" variant="tonal">Trang này sẽ kết nối với Spring Boot API</v-chip>
    </div>
  </v-container>
</template>
<script setup>
</script>
