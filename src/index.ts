import type { App } from 'vue'

import ButtonBase from './components/button-base/ButtonBase.vue'
import type { ButtonProps, ButtonShape, ButtonVariant } from './components/button-base/types'
import './styles/style.css'

export const install = (app: App) => {
  app.component('ButtonBase', ButtonBase)
}

export { ButtonBase }

export type { ButtonProps, ButtonShape, ButtonVariant }

export default {
  install,
}
