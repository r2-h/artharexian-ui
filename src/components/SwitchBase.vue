<script setup lang="ts">
import { ref } from 'vue'

const isPressed = ref(false)
</script>

<template>
  <label class="switch">
    <input type="checkbox" v-model="isPressed" class="input" />
    <div class="slider">
      <div class="thumb" />
    </div>
  </label>
</template>

<style scoped>
.switch {
  display: inline-block;
  cursor: pointer;
}

.input {
  width: 0px;
  height: 0px;
  &:focus-visible + .slider {
    outline: 0.2rem solid var(--foreground, #000);
    outline-offset: 0.4rem;
  }
  &:checked + .slider {
    background-color: var(--primary);
    border: 0.1rem solid var(--primary);
  }
  &:checked + .slider .thumb {
    transform: translateX(2.6rem);
    &::before {
      background-color: var(--primary);
    }
  }
}

.slider {
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
