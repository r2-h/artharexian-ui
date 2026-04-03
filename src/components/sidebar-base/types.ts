import type { CSSProperties, Component, Ref } from 'vue'

export type SidebarContext = {
  isExpanded: Readonly<Ref<boolean>>
  toggleExpand: () => void
  setExpanded: (value: boolean) => void
  currentWidth: Readonly<Ref<number>>
  setCurrentWidth: (value: number) => void
}

export type SidebarProps = {
  maxWidth?: number
  withResize?: boolean
  defaultExpandButton?: DefaultSidebarBtnProps
  defaultHideButton?: DefaultSidebarBtnProps
  side?: 'left' | 'right'
}

export type UseResize = Pick<SidebarContext, 'setCurrentWidth'> & {
  withResize?: boolean
  maxWidth: number
  side?: 'left' | 'right'
  isResizing: Ref<boolean>
}

export type DefaultSidebarBtnProps = {
  class?: string
  style?: CSSProperties
  show?: boolean
  icon?: Component
}
