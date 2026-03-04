<script lang="ts" setup>
import { provide, readonly, ref } from 'vue'

import { TabsKey } from './context'
import type { TabsProps } from './types'

const { defaultValue, variant = 'primary' } = defineProps<TabsProps>()
const activeTab = ref(defaultValue || '')

const setActiveTab = (value: string) => (activeTab.value = value)

provide(TabsKey, {
  variant,
  activeTab: readonly(activeTab),
  setActiveTab,
})
</script>

<template>
  <slot />
</template>
