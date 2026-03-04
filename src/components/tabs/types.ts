import type { Ref } from 'vue'

type TabsVariant = 'default' | 'primary'

export type TabsContext = {
  variant: TabsVariant
  activeTab: Readonly<Ref<string>>
  setActiveTab: (value: string) => void
}

export type TabsProps = {
  defaultValue?: string
  variant?: TabsVariant
}

export type TabsTabProps = {
  value: string
  asChild?: boolean
}
