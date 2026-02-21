<script setup lang="ts">
withDefaults(defineProps<{ as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }>(), {
  as: 'h2',
})
</script>

<template>
  <component :is="as" class="title">
    <slot />
  </component>
</template>

<style scoped>
.title {
  font-weight: 600;
  line-height: 1;
  letter-spacing: var(--tracking-tight);
}
</style>
