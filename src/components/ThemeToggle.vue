<script setup lang="ts">
import useTheme from "../composables/useTheme";

const { currentTheme, toggleTheme } = useTheme();
</script>

<template>
  <button
    @click="toggleTheme()"
    :aria-label="`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`"
    class="theme-toggle-btn"
  >
    <span v-if="currentTheme === 'dark'"> 🌙 </span>
    <span v-else>☀️</span>
  </button>
</template>

<style scoped>
.theme-toggle-btn {
  background: var(--accent);
  width: 40px;
  aspect-ratio: 1;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;

  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
    background: var(--primary);
  }
}
</style>
