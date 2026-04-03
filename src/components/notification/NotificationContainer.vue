<script setup lang="ts">
import { computed } from 'vue'

import NotificationItem from './NotificationItem.vue'
import { notifications, removingIds } from './notification'
import type { NotificationContainerProps } from './types'

const props = defineProps<NotificationContainerProps>()

const filteredNotifications = computed(() =>
  notifications.value.filter((n) => n.side === props.side),
)
</script>

<template>
  <div :class="['container', props.side]">
    <div
      v-for="item in filteredNotifications"
      :key="item.id"
      :class="['item-wrapper', { removing: removingIds.has(item.id) }]"
    >
      <NotificationItem v-bind="item" />
    </div>
  </div>
</template>

<style scoped>
.container {
  --rxn-notification-gap: 1.2rem;

  position: fixed;
  z-index: 3;
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
  pointer-events: none;
}
.item-wrapper {
  --rxn-slide-direction: 100%;

  interpolate-size: allow-keywords;
  animation: slideIn 0.3s linear;
  margin-bottom: var(--rxn-notification-gap);

  &.removing {
    animation:
      shrinkOutMove 0.3s linear forwards,
      shrinkOutCollapse 0.2s ease-in-out 0.25s forwards;
  }
}
.top-left .item-wrapper,
.bottom-left .item-wrapper {
  --rxn-slide-direction: -100%;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(var(--rxn-slide-direction));
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes shrinkOutMove {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(var(--rxn-slide-direction));
  }
}

@keyframes shrinkOutCollapse {
  0% {
    height: stretch;
    margin-bottom: var(--rxn-notification-gap);
  }
  100% {
    height: 0;
    margin-bottom: 0;
  }
}

.top-left {
  top: 0;
  left: 0;
}
.top-right {
  top: 0;
  right: 0;
}
.bottom-left {
  bottom: 0;
  left: 0;
  flex-direction: column-reverse;
}
.bottom-right {
  bottom: 0;
  right: 0;
  flex-direction: column-reverse;
}
</style>
