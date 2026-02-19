<script lang="ts" setup>
import { computed } from 'vue'

import { useTabsContext } from './context'

const props = defineProps<{ value: string }>()
const { activeTab, setActiveTab } = useTabsContext()
//
const selectTab = () => setActiveTab(props.value)
const isSelected = computed(() => activeTab.value === props.value || null)
</script>

<template>
  <button :data-selected="isSelected" @click="selectTab" type="button">
    <slot />
  </button>
</template>

<style scoped>
button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  border-radius: var(--radius-xl);
  padding: 0.8rem 1.6rem;
  transition: all 0.3s;
  position: relative;
  z-index: 10;
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);

  &:focus-visible {
    outline: 0.2rem solid var(--background);
    outline-offset: 0.2rem;
  }
  &:hover {
    color: var(--foreground);
  }
  &[data-selected] {
    background-color: var(--background);
    color: var(--foreground);
    box-shadow: var(--shadow-inset);
  }
}
</style>
