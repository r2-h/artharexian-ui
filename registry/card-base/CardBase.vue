<script setup lang="ts">
const { variant = 'raised' } = defineProps<{ variant?: 'raised' | 'inset' }>()
</script>

<template>
  <section :class="['card', variant]">
    <slot />
  </section>
</template>

<style scoped>
.card {
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
