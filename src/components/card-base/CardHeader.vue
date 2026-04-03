<template>
  <header class="rxn-card-header">
    <slot />
  </header>
</template>

<style>
.rxn-card-header {
  display: flex;
  flex-direction: column;
  padding: var(--card-base-padding);
  row-gap: 0.6rem;
}
</style>
