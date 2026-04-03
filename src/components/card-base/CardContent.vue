<script lang="ts" setup>
const { is = 'main' } = defineProps<{ is?: 'div' | 'section' | 'ul' | 'main' | 'ol' | 'form' }>()
</script>

<template>
  <component :is class="content">
    <slot />
  </component>
</template>

<style scoped>
.content {
  padding: var(--card-base-padding);
  padding-top: 0;
}
</style>
