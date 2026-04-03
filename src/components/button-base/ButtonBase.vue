<script setup lang="ts" generic="T extends Component | keyof HTMLElementTagNameMap = 'button'">
import { type Component, computed } from 'vue'
import { RouterLink } from 'vue-router'

import type { BaseButtonProps } from './types'

const {
  variant = 'default',
  shape = 'shape-default',
  is = 'button',
  type = 'button',
  ...props
} = defineProps<BaseButtonProps>()

const isNativeButton = computed(() => is === 'button')
const isLink = computed(() => {
  return is === 'a' || is === RouterLink
})
const needsButtonRole = computed(() => {
  return !isNativeButton.value && !isLink.value
})
const onKeydown = (e: KeyboardEvent) => {
  if (!needsButtonRole.value) return

  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    ;(e.currentTarget as HTMLElement)?.click()
  }
}
</script>

<template>
  <component
    :is
    v-bind="is === RouterLink ? props : {}"
    :class="['btn', shape, variant]"
    :aria-busy="isLink ? $attrs.disabled : isPending"
    :tabindex="needsButtonRole ? 0 : undefined"
    :type="isNativeButton ? type : undefined"
    @keydown="onKeydown"
  >
    <slot>button</slot>
  </component>
</template>

<style scoped>
.btn {
  --padding-button-sm: 0.5rem;

  -webkit-tab-highlight-color: transparent;
  display: inline-flex;
  column-gap: 0.5rem;
  width: fit-content;
  text-wrap: nowrap;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: var(--background);
  &:focus-visible {
    outline: 0.2rem solid var(--foreground);
    outline-offset: 0.2rem;
  }
}
.shape-default {
  border-radius: var(--radius-xl);
  padding-inline: 1.6rem;
  height: 4.8rem;
}
.shape-small {
  padding: var(--padding-button-sm) 1rem;
  border-radius: none;
}
.shape-icon {
  color: var(--foreground);
  border-radius: var(--radius-md);
  padding: var(--padding-button-sm);
  aspect-ratio: 1;
}

.primary,
.default,
.danger {
  border: 0.3rem solid var(--color-border);
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
  &:hover:not(:disabled) {
    opacity: 0.85;
  }
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
.ghost {
  background-color: inherit;
  &:hover:not(:disabled) {
    background-color: light-dark(
      oklch(from var(--surface) calc(l * 0.98) c h),
      oklch(from var(--surface) calc(l * 1.15) c h)
    );
  }
}

:deep(svg) {
  width: 1.6rem;
  height: 1.6rem;
  flex-shrink: 0;
  color: var(--foreground);
  stroke: var(--foreground);
}
</style>
