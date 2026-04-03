<script setup lang="ts">
import type { PopoverMenu } from './types'

const { options = [], popoverId } = defineProps<PopoverMenu>()
</script>

<template>
  <div popover :id="popoverId" :style="{ positionAnchor: `--${popoverId}` }" class="menu">
    <slot name="popover">
      <button
        v-for="op in options"
        :key="op.action"
        class="button"
        :command="op.closeOnClick ? 'hide-popover' : ''"
        :commandfor="popoverId"
        @click="op.handler"
      >
        <component v-if="op.icon" :is="op.icon" class="icon" />
        {{ op.action }}
      </button>
    </slot>
  </div>
</template>

<style scoped>
[popover] {
  opacity: 0;
  transition:
    opacity 0.25s,
    display 0.25s allow-discrete;
  &:popover-open {
    opacity: 1;
    @starting-style {
      opacity: 0;
    }
  }
}

@position-try --bottom-left {
  position-area: bottom span-left;
  margin-right: -2rem;
}
@position-try --bottom-right {
  position-area: bottom span-right;
}
@position-try --top-right {
  position-area: top span-right;
  margin-bottom: 1rem;
}
@position-try --top-left {
  position-area: top span-left;
  margin-bottom: 1rem;
}

.menu {
  position-area: bottom;
  position-try-fallbacks:
    flip-block, flip-inline, --bottom-left, --bottom-right, --top-right, --top-left;
  margin-top: 1rem;
  text-align: start;
  padding: 1.5rem;
  border: 1px solid var(--color-border-default);
  background-color: var(--background);
  border-radius: var(--radius-md);
  color: var(--foreground);
  min-width: 10rem;
}
.button {
  background-color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  column-gap: 1rem;
  line-height: 1cap;
  & + .button {
    margin-top: 1.5rem;
  }
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
