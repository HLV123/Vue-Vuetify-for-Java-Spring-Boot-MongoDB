import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const artesaniaDark = {
  dark: true,
  colors: {
    background: '#0B1426',
    surface: '#152033',
    'surface-bright': '#1E2D47',
    'surface-variant': '#1A2840',
    'on-surface-variant': '#C0C8D8',
    primary: '#4C6EF5',
    'primary-darken-1': '#3B5BDB',
    secondary: '#F57C00',
    'secondary-darken-1': '#E65100',
    accent: '#00D09C',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  }
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'artesaniaDark',
    themes: {
      artesaniaDark
    }
  },
  defaults: {
    VBtn: {
      rounded: 'lg',
    },
    VCard: {
      rounded: 'lg',
    },
    VTextField: {
      variant: 'outlined',
      density: 'compact',
      color: 'primary',
    },
    VSelect: {
      variant: 'outlined',
      density: 'compact',
      color: 'primary',
    },
    VTextarea: {
      variant: 'outlined',
      color: 'primary',
    },
  }
})
