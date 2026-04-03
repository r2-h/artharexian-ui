<script lang="ts" setup>
import { computed } from 'vue'

import { useTabsContext } from './context'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  value: string
}>()

const { activeTab, setActiveTab, variant } = useTabsContext()

const isSelected = computed(() => activeTab.value === props.value)

const handleClick = (event: MouseEvent) => {
  setActiveTab(props.value)
}

const sharedProps = computed(() => ({
  'data-selected': isSelected.value ? '' : undefined,
  role: 'tab',
  'aria-selected': isSelected.value,
  onClick: handleClick,
}))
</script>

<template>
  <button type="button" v-bind="sharedProps" :class="variant">
    <slot />
  </button>
</template>

<style scoped>
button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  position: relative;
  z-index: 10;
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  background-color: inherit;
  color: var(--muted-foreground);
  &:focus-visible {
    outline: 0.2rem solid var(--foreground);
    outline-offset: 0.2rem;
  }
  &:hover {
    color: var(--foreground);
  }
}
.default {
  border-radius: var(--radius-md);
  padding: 0.4rem 1rem;
  &[data-selected] {
    background-color: var(--muted);
    background-color: light-dark(var(--color-zinc-300), var(--color-zinc-800));
    color: light-dark(black, white);
  }
}
.primary {
  border-radius: var(--radius-xl);
  padding: 0.8rem 1.6rem;
  transition:
    color 0.2s ease-in-out,
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  &[data-selected] {
    background-color: var(--background);
    color: light-dark(black, white);
    box-shadow: var(--shadow-inset);
  }
}
</style>
