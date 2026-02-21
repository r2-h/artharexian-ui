import { type CSSProperties } from 'vue'

export type RangeBaseVars = {
  progress?: { height?: CSSProperties['height']; width?: CSSProperties['width'] }
  thumb?: { size?: CSSProperties['height'] }
}

export type RangeBaseProps = {
  min?: number
  max?: number
  variant?: 'default' | 'secondary'
  hasThumb?: boolean
  cls?: { input?: string; progress?: string; wrapper?: string; container?: string }
  vars?: RangeBaseVars
  isVertical?: boolean
}
