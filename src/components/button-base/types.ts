export type ButtonVariant = 'primary' | 'default' | 'danger' | 'ghost'
export type ButtonShape = 'shape-default' | 'shape-icon' | 'shape-small'

export type ButtonProps = {
  isPending?: boolean
  variant?: ButtonVariant
  shape?: ButtonShape
  type?: 'button' | 'submit' | 'reset'
  is?: 'button' | 'a' | 'RouterLink' | 'div'
}
