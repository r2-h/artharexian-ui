<script lang="ts" setup>
import { useTabsContext } from './context'

const ctx = useTabsContext()
</script>

<template>
  <div :class="['list', ctx.variant]">
    <slot />
  </div>
</template>

<style scoped>
.list {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--muted-foreground);
}
.default {
  gap: 1.6rem;
}
.primary {
  padding: 0.4rem;
  height: 4.8rem;
  gap: 1.6rem;
  border-radius: var(--radius-2xl);
  background: linear-gradient(
    to left,
    var(--background),
    oklch(from var(--highlight) l c h / 0.75)
  );
  box-shadow: var(--shadow-raised);
  border: 0.3rem solid var(--background);
}
</style>
