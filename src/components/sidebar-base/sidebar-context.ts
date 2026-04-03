import type { InjectionKey } from 'vue'
import { inject, provide, readonly, ref } from 'vue'

import { useRefWithLocalStorage } from '../../composables/useRefWithLocalStorage'
import type { SidebarContext } from './types'

export const SIDEBAR_KEY: InjectionKey<SidebarContext> = Symbol('sidebar')

export function useSidebarContext() {
  const context = inject(SIDEBAR_KEY)
  if (!context) throw new Error('useSidebarContext must be used within SidebarLayout')
  return context
}

export function provideSidebarContext() {
  const isExpanded = useRefWithLocalStorage('is-sidebar-expanded', true)
  const currentWidth = ref(240)

  function toggleExpand() {
    isExpanded.value = !isExpanded.value
  }

  function setExpanded(value: boolean) {
    isExpanded.value = value
  }

  function setCurrentWidth(value: number) {
    currentWidth.value = value
  }

  const context: SidebarContext = {
    isExpanded: readonly(isExpanded),
    toggleExpand,
    setExpanded,
    currentWidth: readonly(currentWidth),
    setCurrentWidth,
  }

  provide(SIDEBAR_KEY, context)
  return context
}
