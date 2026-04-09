import type { Component } from 'vue'

export type PopoverProps = {
  popoverId: string
}

export type PopoverOption = {
  title: string
  handler: VoidFunction
  icon?: Component
  closeOnClick?: boolean
}

export type PopoverMenu = {
  popoverId: string
  options?: PopoverOption[]
}
