<script setup lang="ts">
import type { InputProps } from './types'

const model = defineModel<string>({ required: false })
const {
  disabled = false,
  error = '',
  defaultErrorMessage = '',
  isPending = false,
  ...props
} = defineProps<InputProps>()

defineOptions({ inheritAttrs: false })
</script>

<template>
  <div :class="['container', cls?.container]">
    <input
      v-bind="{ ...$attrs, ...props }"
      :disabled="isPending || disabled"
      :class="[{ 'input-error': error, pending: isPending }, cls?.input]"
      @input="model = ($event.target as HTMLInputElement)?.value"
    />
    <span v-if="error" :class="['error-info', cls?.error]">{{ defaultErrorMessage || error }}</span>
    <span v-else :class="['error-info native-error', cls?.error]">
      {{ defaultErrorMessage || error }}
    </span>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

input {
  border: 0.1rem solid var(--color-highlight);
  background: var(--background);
  box-shadow: var(--shadow-inset);
  padding: 0.8rem 1.2rem;
  font-size: var(--text-sm);
  border-radius: var(--radius-md);
  &:focus-visible {
    outline: 0.2rem solid var(--foreground);
    outline-offset: 0.3rem;
  }
}

.container:has(input:user-invalid) .native-error {
  display: inline-block;
}

.error-info {
  color: var(--color-danger);
  margin-top: 0.4rem;
}

.native-error {
  display: none;
}
.pending {
  cursor: progress;
}
.input-error {
  border-color: var(--color-danger);
}
</style>
