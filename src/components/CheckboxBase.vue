<script setup lang="ts">
import { type Component } from 'vue'

import CheckIcon from '../assets/CheckIcon.vue'

withDefaults(defineProps<{ isDisabled?: boolean; icon?: Component }>(), { icon: CheckIcon })
const modelValue = defineModel({ default: false })
defineOptions({ inheritAttrs: false })
</script>

<template>
  <label :class="['wrapper', { 'is-disabled': isDisabled }]">
    <input type="checkbox" v-model="modelValue" v-bind="$attrs" />
    <div class="checkbox">
      <component :is="icon" class="indicator" />
    </div>
    <slot />
  </label>
</template>

<style scoped>
.wrapper {
  display: inline-block;
  cursor: pointer;
}

input {
  appearance: none;
  &:focus-visible + .checkbox {
    outline: 0.2rem solid var(--foreground);
    outline-offset: 0.4rem;
  }
  &:checked + .checkbox {
    color: var(--primary);

    background-image: linear-gradient(
      to top left,
      color-mix(in oklch, var(--primary), transparent 95%),
      color-mix(in oklch, var(--primary), transparent 75%)
    );
    box-shadow: var(--shadow-raised);
  }
  &:checked + .checkbox .indicator {
    display: block;
  }
}
.checkbox {
  display: grid;
  place-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-sm);
  border: 0.1rem solid var(--color-highlight);
  background-color: var(--background);
  box-shadow: var(--shadow-inset);
  transition:
    background-color 250ms ease-out,
    color 250ms ease-out,
    box-shadow 250ms ease-out;
}
.indicator {
  display: none;
}
</style>
