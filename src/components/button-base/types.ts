export type ButtonVariant = 'primary' | 'default' | 'danger' | 'secondary'
export type ButtonShape = 'radius-default' | 'radius-circle'

export type ButtonProps = {
  isPending?: boolean
  variant?: ButtonVariant
  shape?: ButtonShape
  type?: 'button' | 'submit' | 'reset'
  is?: 'button' | 'a'
}
