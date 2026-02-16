<script setup lang="ts">
const props = withDefaults(defineProps<{ variant?: 'raised' | 'inset' }>(), { variant: 'raised' })
</script>

<template>
  <section :class="['card', props.variant]">
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
