<script setup lang="ts">
import ChevronDoubleIcon from '../../assets/ChevronDoubleIcon.vue'
import ButtonBase from '../button-base/ButtonBase.vue'
import { useSidebarContext } from './sidebar-context'

const { isExpanded, toggleExpand } = useSidebarContext()
</script>

<template>
  <ButtonBase
    variant="ghost"
    shape="shape-icon"
    :class="['shrink-btn', { 'is-expanded': isExpanded }]"
    @click="toggleExpand"
  >
    <ChevronDoubleIcon />
  </ButtonBase>
</template>

<style scoped>
.shrink-btn {
  position: absolute;

  z-index: 2;
  transition: opacity 150ms ease-in-out;
  & svg {
    stroke-width: 2px;
  }
}

.shrink-btn.is-expanded {
  &:hover:not(:disabled) {
    background-color: var(--hover-background);
  }
}
</style>
