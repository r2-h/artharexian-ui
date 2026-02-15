<script setup lang="ts">
import useTheme from '../composables/useTheme'
import ButtonBase from './ButtonBase.vue'

const { currentTheme, toggleTheme } = useTheme()
</script>

<template>
  <ButtonBase
    @click="toggleTheme()"
    :aria-label="`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`"
    class="theme-toggle-btn"
    shape="radius-circle"
  >
    <span>{{ currentTheme === 'dark' ? '🌙' : '☀️' }} </span>
  </ButtonBase>
</template>

<style scoped>
.theme-toggle-btn {
  font-size: 1.5rem;
}
</style>
