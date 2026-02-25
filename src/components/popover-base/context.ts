import { type InjectionKey, inject } from 'vue'

import type { PopoverProps } from './types'

export const PopoverKey: InjectionKey<PopoverProps> = Symbol('PopoverContext')

export function usePopoverContext() {
  const context = inject(PopoverKey)
  if (!context) throw new Error('Popover components must be used within PopoverBase')

  return context
}
