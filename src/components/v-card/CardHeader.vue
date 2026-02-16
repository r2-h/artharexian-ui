<template>
  <header class="header">
    <slot />
  </header>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
  row-gap: 0.6rem;
}
</style>
