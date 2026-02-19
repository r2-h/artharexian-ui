<script lang="ts" setup></script>

<template>
  <div class="indicator">
    <slot />
  </div>
</template>

<style scoped>
.indicator {
  position: absolute;
  border-radius: var(--radius-sm);
  background-color: var(--background);
  box-shadow: var(--shadow-raised);
  transition: all 0.2s;
  border: 0.1rem solid var(--background);
}
</style>
