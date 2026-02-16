<script lang="ts" setup>
withDefaults(defineProps<{ as?: 'div' | 'section' | 'ul' | 'main' | 'ol' }>(), { as: 'main' })
</script>

<template>
  <component :is="as" class="content">
    <slot />
  </component>
</template>

<style scoped>
.content {
  padding: 0 2.4rem 2.4rem 2.4rem;
}
</style>
