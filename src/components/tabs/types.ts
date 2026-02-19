import type { Ref } from 'vue'

export type TabsContext = {
  activeTab: Readonly<Ref<string>>
  setActiveTab: (value: string) => void
}
