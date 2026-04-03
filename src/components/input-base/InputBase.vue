<script setup lang="ts">
import type { InputEmits, InputProps } from './types'

const {
  disabled = false,
  error = '',
  defaultErrorMessage = '',
  isPending = false,
  ...props
} = defineProps<InputProps>()
const emit = defineEmits<InputEmits>()
defineOptions({ inheritAttrs: false })
</script>

<template>
  <div :class="['rxn-input-container', cls?.container]">
    <input
      v-bind="{ ...$attrs, ...props }"
      :disabled="isPending || disabled"
      :class="['rxn-input', { 'input-error': error, pending: isPending }, cls?.input]"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span v-if="error" :class="['rxn-input-error-info', cls?.error]">
      {{ defaultErrorMessage || error }}
    </span>
    <span v-else :class="['rxn-input-error-info rxn-input-native-error', cls?.error]">
      {{ defaultErrorMessage || error }}
    </span>
  </div>
</template>

<style>
.rxn-input-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.rxn-input {
  border: 0.1rem solid var(--color-highlight);
  background: var(--background);
  box-shadow: var(--shadow-inset);
  padding: 0.8rem 1.2rem;
  font-size: var(--text-sm);
  border-radius: var(--radius-md);
  outline-color: var(--foreground);
  &.pending {
    cursor: progress;
  }
  &.input-error {
    border-color: var(--color-danger);
  }
}

.rxn-input-container:has(input:user-invalid) .rxn-input-native-error {
  display: inline-block;
}

.rxn-input-error-info {
  color: var(--color-danger);
  margin-top: 0.4rem;
  font-size: 1rem;
}

.rxn-input-native-error {
  display: none;
}
</style>
