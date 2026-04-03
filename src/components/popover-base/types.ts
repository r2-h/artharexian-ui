import type { Component } from 'vue'

export type PopoverProps = {
  popoverId: string
}

export type PopoverMenu = {
  popoverId: string
  options?: { action: string; handler: VoidFunction; icon?: Component; closeOnClick?: boolean }[]
}
