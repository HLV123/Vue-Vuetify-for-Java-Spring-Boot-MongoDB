/**
 * Format VND currency
 */
export function formatPrice(value) {
  if (!value && value !== 0) return ''
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value)
}

/**
 * Format date to Vietnamese locale
 */
export function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

/**
 * Format datetime
 */
export function formatDateTime(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Truncate text
 */
export function truncate(text, length = 100) {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

/**
 * Generate slug from Vietnamese text
 */
export function slugify(text) {
  if (!text) return ''
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Order status mapping
 */
export const ORDER_STATUSES = {
  PENDING: { text: 'Chờ xác nhận', color: 'warning', icon: 'mdi-clock-outline' },
  CONFIRMED: { text: 'Đã xác nhận', color: 'info', icon: 'mdi-check-circle-outline' },
  PROCESSING: { text: 'Đang chế tác', color: 'primary', icon: 'mdi-hammer-wrench' },
  SHIPPING: { text: 'Đang vận chuyển', color: 'secondary', icon: 'mdi-truck-delivery' },
  DELIVERED: { text: 'Đã giao hàng', color: 'success', icon: 'mdi-package-check' },
  CANCELLED: { text: 'Đã hủy', color: 'error', icon: 'mdi-close-circle-outline' },
  RETURNED: { text: 'Hoàn trả', color: 'grey', icon: 'mdi-undo' }
}

/**
 * Payment method mapping
 */
export const PAYMENT_METHODS = {
  COD: { text: 'Thanh toán khi nhận hàng', icon: 'mdi-cash' },
  BANK_TRANSFER: { text: 'Chuyển khoản ngân hàng', icon: 'mdi-bank' },
  MOMO: { text: 'Ví MoMo', icon: 'mdi-wallet' },
  VNPAY: { text: 'VNPay', icon: 'mdi-credit-card' },
  ZALOPAY: { text: 'ZaloPay', icon: 'mdi-cellphone' }
}

/**
 * Debounce utility
 */
export function debounce(fn, delay = 300) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}
