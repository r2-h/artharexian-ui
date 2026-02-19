import { type InjectionKey, inject } from 'vue'

import type { TabsContext } from './types'

export const TabsKey: InjectionKey<TabsContext> = Symbol('TabsContext')

export function useTabsContext() {
  const context = inject(TabsKey)
  if (!context) throw new Error('Tabs components must be used within TabsBase')

  return context
}
