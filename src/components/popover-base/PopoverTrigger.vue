<script setup lang="ts">
import { computed } from 'vue'

import { useClone } from '../../composables/useClone'
import type { PopoverProps } from './types'

const { popoverId, asChild = false } = defineProps<PopoverProps>()

const sharedProps = computed(() => ({
  popovertarget: popoverId,
  style: { anchorName: `--${popoverId}` },
}))

const clone = useClone(sharedProps.value)
</script>

<template>
  <component v-if="asChild" :is="clone()" />

  <button v-else v-bind="sharedProps">
    <slot> Popover trigger</slot>
  </button>
</template>
