<script setup lang="ts">
const modelValue = defineModel({ default: false })
</script>

<template>
  <label class="wrapper">
    <input type="checkbox" v-model="modelValue" />
    <div class="switch">
      <div class="thumb" />
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
  &:focus-visible + .switch {
    outline: 0.2rem solid var(--foreground);
    outline-offset: 0.4rem;
  }
  &:checked + .switch {
    background-color: var(--primary);
    border: 0.1rem solid var(--primary);
  }
  &:checked + .switch .thumb {
    transform: translateX(2.6rem);
    &::before {
      background-color: var(--primary);
    }
  }
}

.switch {
  height: 2.2rem;
  width: 4.8rem;
  border-radius: calc(1px * Infinity);
  background-color: var(--background);
  box-shadow: var(--shadow-inset);
  border: 0.1rem solid var(--color-highlight);
}

.thumb {
  display: grid;
  place-content: center;
  height: 2rem;
  aspect-ratio: 1;
  border-radius: calc(1px * Infinity);
  background-color: var(--background);
  box-shadow: var(--shadow-inset);
  transform: translateX(0);
  transition: all 200ms ease-out;
  border: 0.1rem solid var(--color-highlight);
  &::before {
    content: '';
    width: 0.4rem;
    aspect-ratio: 1;
    background-color: var(--muted-foreground);
    border-radius: calc((1px * Infinity));
  }
}
</style>
