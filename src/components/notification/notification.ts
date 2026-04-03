import { ref } from 'vue'

import type { NotificationState, UseNotificationOptions } from './types'

let id = 0
export const notifications = ref<NotificationState[]>([])
export const removingIds = ref<Set<number>>(new Set())

export function useNotification() {
  function notify(
    message: string,
    {
      type = 'info',
      side = 'top-right',
      duration = 3000,
      description,
      undoHandler,
    }: UseNotificationOptions,
  ) {
    const n: NotificationState = {
      id: ++id,
      message,
      type,
      duration,
      description,
      side,
      undoHandler,
    }

    notifications.value.push(n)

    if (duration) {
      setTimeout(() => remove(n.id), duration)
    }
  }

  function remove(id: number) {
    removingIds.value.add(id)

    setTimeout(() => {
      notifications.value = notifications.value.filter((n) => n.id !== id)
      removingIds.value.delete(id)
    }, 600)
  }

  return {
    notifications,
    removingIds,
    notify,
    remove,
  }
}
