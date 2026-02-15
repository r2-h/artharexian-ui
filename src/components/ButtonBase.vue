<script setup lang="ts">
import { type ButtonHTMLAttributes, computed } from 'vue'

type ButtonVariant = 'accent' | 'primary' | 'ghost' | 'danger'

type Props = {
  isPending?: boolean
  variant?: ButtonVariant
  type?: ButtonHTMLAttributes['type']
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
})

const className = computed(() => ({
  btn: true,
  'btn-accent': props.variant === 'accent',
  'btn-primary': props.variant === 'primary',
  'btn-ghost': props.variant === 'ghost',
  'btn-danger': props.variant === 'danger',
  pending: props.isPending,
}))
</script>

<template>
  <button :class="className" :type="type" :disabled="isPending || disabled">
    <slot>button</slot>
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  font: 500;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-xl);
  cursor: pointer;
  border: 0.3rem solid var(--background);
  height: 4.8rem;
  padding-inline: 1.6rem;
  background: var(--background);
  box-shadow: var(--shadow-raised);
  &:focus-visible {
    outline: 0.2rem solid var(--foreground);
    outline-offset: 0.2rem;
  }
  &:hover:not(:disabled) {
    opacity: 0.85;
  }
}
.btn-accent {
  background: var(--accent);
}

.btn-primary {
  color: var(--primary);
  background-image: linear-gradient(
    to top left,
    color-mix(in srgb, var(--primary), transparent 95%),
    color-mix(in srgb, var(--primary), transparent 75%)
  );
}

.btn-ghost {
  background-image: linear-gradient(
    to top left,
    color-mix(in srgb, var(--background), transparent 95%),
    color-mix(in srgb, var(--color-highlight), transparent 75%)
  );
}

.btn-danger {
  color: var(--color-danger);
  background-image: linear-gradient(
    to top left,
    color-mix(in srgb, var(--color-danger), transparent 95%),
    color-mix(in srgb, var(--color-danger), transparent 75%)
  );
}
</style>
