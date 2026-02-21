import 'artharexian-ui/css'
import { createApp } from 'vue'

import App from './App.vue'
import { initTheme } from './composables/useTheme'
import './styles/style.css'

// Инициализируем тему до монтирования приложения
initTheme()

createApp(App).mount('#app')
