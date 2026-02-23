<script lang="ts" setup>
withDefaults(defineProps<{ is?: 'div' | 'section' | 'ul' | 'main' | 'ol' | 'form' }>(), {
  is: 'main',
})
</script>

<template>
  <component :is class="content">
    <slot />
  </component>
</template>

<style scoped>
.content {
  padding: 0 2.4rem 2.4rem 2.4rem;
}
</style>
