<script setup lang="ts">
import { useTemplateRef, watchEffect } from 'vue';

import type { DialogBaseEmits, DialogBaseProps } from './types';

const { closedby = 'any', id, isOpen, portal = 'body', cls } = defineProps<DialogBaseProps>()
const emit = defineEmits<DialogBaseEmits>()
defineOptions({ inheritAttrs: false })

const dialogRef = useTemplateRef('dialogRef')

function onNativeClose() {
  emit('onClose')
}
function open() {
  dialogRef.value?.showModal()
  emit('onOpen')
}
function close() {
  dialogRef.value?.close()
  onNativeClose()
}
function toggle() {
  if (dialogRef.value?.open) close()
  else open()
}

defineExpose({ open, close, toggle })

if (isOpen !== undefined) {
  watchEffect(() => {
    if (isOpen && !dialogRef.value?.open) open()
    if (!isOpen && dialogRef.value?.open) close()
  })
}
</script>

<template>
  <Teleport :to="portal" :disabled="!portal">
    <dialog
      v-bind="$attrs"
      ref="dialogRef"
      :class="['rxn-dialog', cls]"
      :closedby
      :id
      @close="onNativeClose"
    >
      <slot :close="close">
        <p>Default modal</p>
        <button @click="close">Close</button>
      </slot>
    </dialog>
  </Teleport>
</template>

<style>
.rxn-dialog {
  width: 100%;
  background-color: transparent;
  overflow: initial;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  &::backdrop {
    background-color: light-dark(oklch(from black l c h / 0.5), oklch(from black l c h / 0.8));
  }

  @media (450px < width) {
    width: fit-content;
  }
}

[data-theme='light'] .rxn-dialog {
  &::backdrop {
    backdrop-filter: blur(1px);
  }
}
</style>
