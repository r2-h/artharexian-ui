<script setup lang="ts">
import ButtonBase from './components/ButtonBase.vue'
import ThemeToggle from './components/ThemeToggle.vue'
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>UI Library Demo</h1>
      <ThemeToggle />
    </header>
    <main>
      <ButtonBase />
      <ButtonBase variant="danger" />
      <ButtonBase variant="accent" />
      <ButtonBase variant="ghost" />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  padding: 20px;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
</style>
