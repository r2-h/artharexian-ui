<script setup lang="ts">
import ButtonBase from "./components/ButtonBase.vue";
import ThemeToggle from "./components/ThemeToggle.vue";
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>UI Library Demo</h1>
      <ThemeToggle />
    </header>
    <main>
      <ButtonBase />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  padding: 20px;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.app-header h1 {
  margin: 0;
  color: var(--foreground);
}
</style>
