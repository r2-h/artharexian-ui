<script setup lang="ts">
import { computed } from 'vue'

import type { PopoverProps } from './types'

const { popoverId } = defineProps<PopoverProps>()

const sharedProps = computed(() => ({
  popovertarget: popoverId,
  style: { anchorName: `--${popoverId}` },
}))
</script>

<template>
  <button v-bind="sharedProps">
    <slot> Popover trigger</slot>
  </button>
</template>
