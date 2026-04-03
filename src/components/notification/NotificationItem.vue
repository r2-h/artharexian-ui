<script setup lang="ts">
import ErrorIcon from '@/assets/ErrorIcon.vue'
import InfoIcon from '@/assets/InfoIcon.vue'
import SuccessIcon from '@/assets/SuccessIcon.vue'
import UndoIcon from '@/assets/UndoIcon.vue'
import WarningIcon from '@/assets/WarningIcon.vue'
import XMarkIcon from '@/assets/XMarkIcon.vue'

import ButtonBase from '../button-base/ButtonBase.vue'
import { useNotification } from './notification'
import type { NotificationItemProps } from './types'

const { description, id, message, type, undoHandler } = defineProps<NotificationItemProps>()

const { remove } = useNotification()

function onUndoHandler(id: number) {
  undoHandler?.()
  remove(id)
}
</script>

<template>
  <div class="notification notification-content" :data-type="type">
    <div class="hstack">
      <SuccessIcon v-if="type === 'success'" class="icon" />
      <ErrorIcon v-if="type === 'error'" class="icon" />
      <WarningIcon v-if="type === 'warning'" class="icon" />
      <InfoIcon v-if="type === 'info'" class="icon" />

      <span class="notification-title">{{ message }}</span>
      <ButtonBase
        v-if="undoHandler"
        class="undo"
        variant="ghost"
        shape="shape-icon"
        @click="onUndoHandler(id)"
      >
        <UndoIcon />
      </ButtonBase>
      <ButtonBase class="close-button" variant="ghost" shape="shape-icon" @click="remove(id)">
        <XMarkIcon />
      </ButtonBase>
    </div>
    <span v-if="description" class="description">{{ description }}</span>
  </div>
</template>

<style scoped>
.notification {
  pointer-events: auto;
  padding: 1.2rem 1.6rem;
  font-size: var(--text-sm);
  min-width: 28rem;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  color: var(--foreground);
  background-color: var(--background);
}
.notification[data-type='success'] {
  & .icon {
    color: var(--color-green-600);
    stroke: var(--color-green-600);
  }
}
.notification[data-type='error'] {
  & .icon {
    color: var(--color-red-500);
  }
}
.notification[data-type='warning'] {
  & .icon {
    color: var(--color-amber-600);
  }
}
.notification[data-type='info'] {
  & .icon {
    color: var(--color-blue-500);
  }
}

.notification-title {
}
.undo {
  font-size: var(--text-sm);
}
.close-button {
  margin-left: auto;
}
.description {
  display: inline-block;
  margin-top: 0.5rem;
  font-weight: var(--font-weight-normal);
}
</style>
