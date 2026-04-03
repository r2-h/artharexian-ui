<script setup lang="ts">
const { is = 'h2' } = defineProps<{ is?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }>()
</script>

<template>
  <component :is class="rxn-card-title">
    <slot />
  </component>
</template>

<style>
.rxn-card-title {
  font-weight: 600;
}
</style>
