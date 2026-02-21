<script setup lang="ts">
defineProps<{ range: number; max: number }>()
</script>

<template>
  <output class="output" :style="{ minWidth: `${String(max).length}ch` }">
    {{ range }}
  </output>
</template>

<style scoped>
.output {
  font-size: 1.5rem;
  font-weight: bold;
  font-variant-numeric: tabular-nums;
}
</style>
