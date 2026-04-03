import { RouterLink } from 'vue-router'
import type { RouterLinkProps } from 'vue-router'

type BaseProps = {
  isPending?: boolean
  variant?: 'primary' | 'default' | 'danger' | 'ghost'
  shape?: 'shape-default' | 'shape-icon' | 'shape-small'
  type?: 'button' | 'submit' | 'reset'
}

type NativeButtonProps = BaseProps & {
  is?: 'button' | 'a' | 'div' | 'li'
  type?: 'button' | 'submit' | 'reset'
  to?: never
}

type RouterButtonProps = BaseProps & {
  is?: typeof RouterLink
  type?: never
} & RouterLinkProps

export type BaseButtonProps = NativeButtonProps | RouterButtonProps
