<script setup lang="ts">
import type { ButtonProps } from './types'

const {
  variant = 'default',
  shape = 'radius-default',
  is = 'button',
  type = 'button',
} = defineProps<ButtonProps>()
</script>

<template>
  <component
    :is
    :class="['btn', shape, variant]"
    :aria-busy="isPending"
    :type="is === 'button' ? type : null"
  >
    <slot>button</slot>
  </component>
</template>

<style scoped>
.btn {
  display: inline-flex;
  width: fit-content;
  text-wrap: nowrap;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 0.3rem solid var(--color-border);
  background: var(--background);
  box-shadow: var(--shadow-raised);
  transition:
    scale 0.2s ease-in-out,
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out,
    box-shadow 0.1s ease-in-out,
    border-color 0.1s ease-in-out;

  &:active {
    box-shadow: var(--shadow-inset);
    scale: 97%;
  }
  &:focus-visible {
    outline: 0.2rem solid var(--foreground);
    outline-offset: 0.2rem;
  }
  &:hover:not(:disabled) {
    opacity: 0.85;
  }
}
.radius-default {
  border-radius: var(--radius-xl);
  padding-inline: 1.6rem;
  height: 4.8rem;
}
.radius-circle {
  border-radius: 5rem;
  padding: 1rem;
  min-width: 4rem;
  aspect-ratio: 1;
}
.primary {
  color: var(--primary);
  background-image: linear-gradient(
    to top left,
    color-mix(in oklch, var(--primary), transparent 97%),
    color-mix(in oklch, var(--primary), transparent 78%)
  );
}
.default {
  background-image: linear-gradient(
    to top left,
    color-mix(in oklch, var(--muted), transparent 97%),
    color-mix(in oklch, var(--muted), transparent 5%)
  );
}
.danger {
  color: var(--color-danger);
  background-image: linear-gradient(
    to top left,
    color-mix(in oklch, var(--color-danger), transparent 97%),
    color-mix(in oklch, var(--color-danger), transparent 78%)
  );
}
.secondary {
  border: none;
  box-shadow: var(--shadow-inset);
  color: var(--muted-foreground);
}
</style>
