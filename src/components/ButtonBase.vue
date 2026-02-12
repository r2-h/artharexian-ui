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
  padding: 0.7rem 1.4rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  border: 0;
  color: #fff;
}
.btn-accent {
  background: var(--color-accent);
}

.btn-primary {
  background: var(--color-primary);
}

.btn-ghost {
  background: transparent;
  outline: 1px solid var(--color-border);
  color: var(--color-button);
  font-weight: 500;
}

.btn-danger {
  background: var(--color-danger);
}

.pending {
  cursor: progress;
}
</style>
