import type { Ref } from 'vue'

export type TabsContext = {
  activeTab: Ref<string> // Тут мы оставляем Ref, readonly наложим при provide
  setActiveTab: (value: string) => void
}
