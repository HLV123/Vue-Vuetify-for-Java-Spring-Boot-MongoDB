import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    snackbar: {
      show: false,
      text: '',
      color: 'success',
      timeout: 3000
    }
  }),

  actions: {
    showSuccess(text) {
      this.snackbar = { show: true, text, color: 'success', timeout: 3000 }
    },
    showError(text) {
      this.snackbar = { show: true, text, color: 'error', timeout: 4000 }
    },
    showInfo(text) {
      this.snackbar = { show: true, text, color: 'info', timeout: 3000 }
    },
    showWarning(text) {
      this.snackbar = { show: true, text, color: 'warning', timeout: 3500 }
    },
    hide() {
      this.snackbar.show = false
    }
  }
})
