<script setup lang="ts">
import { usePopoverContext } from './context'

const { popoverId } = usePopoverContext()
</script>

<template>
  <button :popovertarget="popoverId" :style="{ anchorName: `--${popoverId}` }">
    <slot />
  </button>
</template>

<style scoped>
/*
<a interestfor="popover--comments" style="anchor-name: --comments" href="#">24 comments</a>
*/
</style>
