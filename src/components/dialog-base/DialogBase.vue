<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { DialogBaseProps } from './types'

const { closedby = 'any', portal = 'body' } = defineProps<DialogBaseProps>()

const isOpen = defineModel<boolean>({ required: true })

defineOptions({ inheritAttrs: false })

function close() {
  isOpen.value = false
}

function onBackdropClick() {
  if (closedby === 'any') close()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && closedby === 'any') close()
}
onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport v-if="isOpen" :to="portal">
    <div class="rxn-dialog-overlay">
      <div class="rxn-dialog-backdrop" @click="onBackdropClick" />
      <div class="rxn-dialog-content" v-bind="$attrs">
        <slot :close="close">
          <p>Default modal</p>
          <button @click="close">Close</button>
        </slot>
      </div>
    </div>
  </Teleport>
</template>

<style>
.rxn-dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rxn-dialog-backdrop {
  position: fixed;
  inset: 0;
  background-color: light-dark(oklch(from black l c h / 0.5), oklch(from black l c h / 0.8));
  backdrop-filter: blur(1px);
}

.rxn-dialog-content {
  position: relative;
  width: 100%;

  @media (450px < width) {
    width: fit-content;
  }
}
</style>
