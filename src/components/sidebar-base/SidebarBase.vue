<script setup lang="ts">
import { computed, ref } from 'vue'

import SidebarButton from './SidebarButton.vue'
import { useSidebarContext } from './sidebar-context'
import type { DefaultSidebarBtnProps, SidebarProps } from './types'
import { useResize } from './use-resize'

const { isExpanded, currentWidth, setCurrentWidth } = useSidebarContext()

const {
  side = 'left',
  maxWidth = 480,
  withResize = false,
  ...restProps
} = defineProps<SidebarProps>()

const defaultExpandButton = computed<DefaultSidebarBtnProps>(() => ({
  show: true,
  ...restProps.defaultExpandButton,
}))
const defaultHideButton = computed<DefaultSidebarBtnProps>(() => ({
  show: true,
  ...restProps.defaultHideButton,
}))

const isResizing = ref(false)

const startResizing = useResize({ isResizing, maxWidth, setCurrentWidth, side, withResize })
</script>

<template>
  <aside
    :class="['sidebar', side, { resizing: isResizing }, $attrs.class]"
    :style="Object.assign({ width: isExpanded ? `${currentWidth}px` : `0px` }, $attrs.style)"
  >
    <SidebarButton
      v-if="defaultExpandButton.show"
      :class="['expand-button', side, defaultExpandButton.class]"
      :style="defaultExpandButton.style"
    />

    <slot />
    <div v-if="withResize && isExpanded" class="resize-handle" @mousedown.prevent="startResizing" />
  </aside>
  <SidebarButton
    v-if="defaultHideButton.show"
    :class="['hide-button', side, defaultHideButton.class]"
    :style="defaultHideButton.style"
  />
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  height: stretch;
  z-index: 3;
  overflow: hidden;
  container: sidebar / inline-size;
  color: var(--foreground);
  background-color: light-dark(
    oklch(from var(--background) calc(l * 0.985) c h),
    oklch(from var(--background) calc(l * 1.1) c h)
  );
  will-change: width; /* Подсказка браузеру для оптимизации */
  transition: width 0.2s ease;
  &.resizing {
    transition: none;
  }
  &:deep(.shrink-btn) {
    opacity: 0;
  }
  &:hover {
    &:deep(.shrink-btn) {
      opacity: 1;
    }
    .resize-handle {
      background-color: var(--hover-background);
    }
  }
  &:has(.resize-handle:active) {
    .shrink-btn {
      opacity: 1;
    }
  }
}
.sidebar.left {
  left: 0;
  & .resize-handle {
    right: 0;
  }
}
.sidebar.right {
  right: 0;
  & .resize-handle {
    left: 0;
  }
}
@container sidebar (width <= 4.5rem) {
  :deep(.shrink-btn) {
    display: none;
  }
}
.resize-handle {
  position: absolute;
  top: 0;
  width: 0.5rem;
  height: 100%;
  cursor: col-resize;
  transition: background-color 150ms ease-in-out;
  &:active {
    background-color: var(--hover-background);
  }
}

.expand-button.left {
  right: 1rem;
}
.expand-button.right {
  left: 1rem;
  transform: rotate(180deg);
}
.hide-button.left {
  left: 1rem;
  transform: rotate(180deg);
}
.hide-button.right {
  right: 1rem;
}
</style>
