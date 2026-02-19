<script lang="ts" setup>
import { provide, readonly, ref } from 'vue'

import { TabsKey } from './context'

const props = defineProps<{ defaultValue?: string }>()
const activeTab = ref(props.defaultValue || '')

const setActiveTab = (value: string) => (activeTab.value = value)

provide(TabsKey, {
  activeTab: readonly(activeTab),
  setActiveTab,
})
</script>

<template>
  <section class="tabs-base">
    <slot />
  </section>
</template>
