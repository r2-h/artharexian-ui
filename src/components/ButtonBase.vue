<script setup lang="ts">
import { type ButtonHTMLAttributes, computed } from "vue";

type ButtonVariant = "accent" | "primary" | "ghost" | "danger";

type Props = {
  isPending?: boolean;
  variant?: ButtonVariant;
  type?: ButtonHTMLAttributes["type"];
  disabled?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  type: "button",
  variant: "primary",
});

const className = computed(() => ({
  btn: true,
  "btn-accent": props.variant === "accent",
  "btn-primary": props.variant === "primary",
  "btn-ghost": props.variant === "ghost",
  "btn-danger": props.variant === "danger",
  pending: props.isPending,
}));
</script>

<template>
  <button :class="className" :type="type" :disabled="isPending || disabled">
    <slot>button</slot>
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);

  cursor: pointer;
  color: var(--primary-foreground);
  transition: all 0.2s ease;
  height: 4.8rem;
  padding-inline: 1.6rem;
  &:hover:not(:disabled) {
    opacity: 0.85;
  }
}
.btn-accent {
  background: var(--accent);
}

.btn-primary {
  background: var(--primary);
}

.btn-ghost {
  background-color: transparent;
  border: 1px solid var(--border);
  color: var(--foreground);
  font-weight: 500;
  &:hover {
    background-color: var(--muted);
  }
}

.btn-danger {
  background: var(--color-danger);
  color: var(--primary-foreground);
}
</style>
