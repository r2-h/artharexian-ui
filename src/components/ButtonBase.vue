<script setup lang="ts">
import { type ButtonHTMLAttributes } from 'vue'

type ButtonVariant = 'primary' | 'default' | 'danger'
type ButtonShape = 'radius-default' | 'radius-circle'

type Props = {
  isPending?: boolean
  variant?: ButtonVariant
  shape?: ButtonShape
  type?: ButtonHTMLAttributes['type']
  disabled?: boolean
  as?: 'button' | 'a'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'default',
  shape: 'radius-default',
  as: 'button',
})
</script>

<template>
  <button :as :class="['btn', shape, variant]" :type :disabled :aria-busy="isPending">
    <slot>button</slot>
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
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
  aspect-ratio: 1;
  height: 4.8rem;
}
.radius-circle {
  border-radius: 5rem;
  padding: 1rem;
  min-width: 5rem;
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
</style>
