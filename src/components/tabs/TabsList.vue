<script lang="ts" setup></script>

<template>
  <div class="list">
    <slot />
  </div>
</template>

<style scoped>
.list {
  position: relative;
  padding: 0.4rem;
  display: inline-flex;
  height: 4.8rem;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  border-radius: var(--radius-2xl);
  background: linear-gradient(
    to left,
    var(--background),
    oklch(from var(--highlight) l c h / 0.75)
  );
  color: var(--muted-foreground);
  box-shadow: var(--shadow-raised);
  border: 0.3rem solid var(--background);
}
</style>
