<script setup lang="ts">
const props = withDefaults(defineProps<{ as?: 'p' | 'div' | 'span' }>(), {
  as: 'p',
})
</script>

<template>
  <component :is="as" class="description">
    <slot />
  </component>
</template>

<style scoped>
.description {
  font-size: var(--text-sm);
  color: var(--muted-foreground);
}
</style>
