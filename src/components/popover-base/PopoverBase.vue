<script setup lang="ts">
import { provide } from 'vue'

import { PopoverKey } from './context'
import type { PopoverProps } from './types'

const props = defineProps<PopoverProps>()
provide(PopoverKey, { popoverId: `popover-id-${props.popoverId}` })
</script>

<template>
  <slot />
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
</style>
