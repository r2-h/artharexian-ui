<script setup lang="ts">
import { usePopoverContext } from './context'
import type { PopoverMenu } from './types'

const { options = [] } = defineProps<PopoverMenu>()
const { popoverId } = usePopoverContext()
</script>

<template>
  <div popover :id="popoverId" :style="{ positionAnchor: `--${popoverId}` }" class="menu">
    <button
      class="button"
      v-for="op in options"
      :key="op.action"
      :popovertarget="op.closeOnClick ? popoverId : null"
      @click="op.handler"
    >
      <component v-if="op.icon" :is="op.icon" class="icon" />
      {{ op.action }}
    </button>
    <slot />
  </div>
</template>

<style scoped>
@position-try --bottom-left {
  position-area: bottom span-left;
  margin-right: -2rem;
}

.menu {
  position-area: bottom;
  position-try-fallbacks: --bottom-left;
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 1.5rem;
  margin-top: 1rem;
  text-align: start;
  padding: 1.5rem;
  border: 1px solid var(--color-zinc-700);
  background-color: var(--background);
  border-radius: var(--radius-md);

  min-width: 10rem;
}

.button {
  background-color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  column-gap: 1rem;
  line-height: 1cap;
}

.icon {
  width: 1.8rem;
  aspect-ratio: 1;
}

/*

<ul id="popover--comments" popover="hint" style="position-anchor: --comments; position-area: top">
    <li>Jenny Smith</li>
    <li>Mia Apple</li>
</ul>

#popover--comments { background: light-dark(#000000c4, #616176); color: white; border-radius:
0.25rem; font-size: 80%; }
 */
</style>
