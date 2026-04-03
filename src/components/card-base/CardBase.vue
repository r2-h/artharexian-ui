<script setup lang="ts">
import { ref } from 'vue'

const { variant = 'raised', is = 'section' } = defineProps<{
  variant?: 'raised' | 'inset'
  is?: 'section' | 'div' | 'dialog' | 'form'
}>()

const elementRef = ref<HTMLDialogElement | HTMLDivElement | HTMLFormElement>()

defineExpose({ elementRef })
</script>

<template>
  <component ref="elementRef" :is="is" :class="['card', variant]">
    <slot />
  </component>
</template>

<style scoped>
.card {
  --card-base-padding: 2.3rem;

  background-color: var(--background);
  border-radius: var(--radius-2xl);
  border: 0.3rem solid var(--color-border);
}

.raised {
  box-shadow: var(--shadow-raised);
}
.inset {
  box-shadow: var(--shadow-inset);
}
</style>
