<script setup lang="ts">
import MoonIcon from '../assets/MoonIcon.vue'
import SunIcon from '../assets/SunIcon.vue'
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
    <MoonIcon v-if="currentTheme === 'dark'" class="moon" />
    <SunIcon v-else />
  </ButtonBase>
</template>

<style scoped>
.theme-toggle-btn {
  font-size: 1.5rem;
}
.moon {
  height: 2rem;
  width: 2rem;
}
</style>
