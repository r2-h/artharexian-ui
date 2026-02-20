import type { App } from 'vue'

import ButtonBase from './components/button-base/ButtonBase.vue'
import type { ButtonProps, ButtonShape, ButtonVariant } from './components/button-base/types'
import { initTheme } from './composables/useTheme'
import './styles/style.css'

// Функция для подключения всей библиотеки разом через app.use()
export const install = (app: App) => {
  app.component('ButtonBase', ButtonBase)
  initTheme()
}

// Экспортируем по отдельности для tree-shaking (чтобы юзер мог взять только 1 компонент)
export { ButtonBase }

// Экспорт типов
export type { ButtonProps, ButtonVariant, ButtonShape }

// Экспорт по умолчанию для app.use()
export default {
  install,
}
