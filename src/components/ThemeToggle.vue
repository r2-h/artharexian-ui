<script setup lang="ts">
import { onMounted } from "vue";
import { initTheme } from "../composables/useTheme";
import useThemeComposable from "../composables/useTheme";

onMounted(() => initTheme());

const themeState = useThemeComposable();
</script>
//
<template>
  <div class="theme-toggle">
    <button
      @click="themeState.toggleTheme()"
      :aria-label="`Switch to ${themeState.currentTheme.value === 'dark' ? 'light' : 'dark'} theme`"
      class="theme-toggle-btn"
    >
      <span v-if="themeState.currentTheme.value === 'dark'" class="theme-icon">
        🌙
      </span>
      <span v-else class="theme-icon">☀️</span>
    </button>
  </div>
</template>

<style scoped>
.theme-toggle {
  display: inline-block;
}

.theme-toggle-btn {
  background: var(--accent);
  color: var(--accent-foreground);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.3s ease;
}

.theme-toggle-btn:hover {
  transform: scale(1.1);
  background: var(--primary);
}

.theme-icon {
  pointer-events: none;
}
</style>
