<template>
  <v-app>
    <router-view />

    <!-- Global Snackbar -->
    <v-snackbar
      v-model="notificationStore.snackbar.show"
      :color="notificationStore.snackbar.color"
      :timeout="notificationStore.snackbar.timeout"
      location="top right"
      rounded="lg"
    >
      <div class="d-flex align-center">
        <v-icon class="mr-2" size="20">
          {{ snackbarIcon }}
        </v-icon>
        {{ notificationStore.snackbar.text }}
      </div>
      <template v-slot:actions>
        <v-btn variant="text" size="small" @click="notificationStore.hide()">
          Đóng
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notification'
import { useCartStore } from '@/stores/cart'

const notificationStore = useNotificationStore()
const cartStore = useCartStore()

// Load saved cart on app mount
cartStore.loadLocal()

const snackbarIcon = computed(() => {
  const map = {
    success: 'mdi-check-circle',
    error: 'mdi-alert-circle',
    info: 'mdi-information',
    warning: 'mdi-alert'
  }
  return map[notificationStore.snackbar.color] || 'mdi-information'
})
</script>
