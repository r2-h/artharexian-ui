<script setup lang="ts">
import { useTemplateRef } from 'vue'

import type { PopoverMenu, PopoverOption } from './types'

const { options = [], popoverId } = defineProps<PopoverMenu>()

const popoverElement = useTemplateRef('popoverElement')

function onClick(option: PopoverOption) {
  option.handler()
  if (option.closeOnClick !== false) hidePopover()
}

function showPopover() {
  popoverElement.value?.showPopover()
}
function hidePopover() {
  popoverElement.value?.hidePopover()
}
function togglePopover() {
  popoverElement.value?.togglePopover()
}

defineExpose({ showPopover, togglePopover, hidePopover })
</script>

<template>
  <div
    ref="popoverElement"
    popover
    :id="popoverId"
    :style="{ positionAnchor: `--${popoverId}` }"
    class="rxn-popover-menu"
  >
    <slot>
      <button
        v-for="op in options"
        :key="op.title"
        class="rxn-popover-button"
        :command="op.closeOnClick === false ? '' : 'hide-popover'"
        :commandfor="popoverId"
        @click="onClick(op)"
      >
        <component v-if="op.icon" :is="op.icon" class="rxn-popover-icon" />
        {{ op.title }}
      </button>
    </slot>
  </div>
</template>

<style>
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

.rxn-popover-menu {
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
.rxn-popover-button {
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
.rxn-popover-icon {
  width: 1.8rem;
  aspect-ratio: 1;
}
</style>
