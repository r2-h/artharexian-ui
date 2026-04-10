import { ref } from 'vue'
import type { NotificationState, UseNotificationOptions } from './types'

let id = 0
export const notifications = ref<NotificationState[]>([])
export const removingIds = ref<Set<number>>(new Set())
const timers = new Map<number, ReturnType<typeof setTimeout>>()

export function useNotification() {
  function notify(message: string, options: UseNotificationOptions | undefined) {
    const duration = options?.duration ?? 3500
    const n: NotificationState = {
      id: ++id,
      message,
      duration,
      type: options?.type ?? 'info',
      description: options?.description,
      side: options?.side ?? 'top-right',
      undoHandler: options?.undoHandler,
    }

    notifications.value.push(n)

    const timerId = setTimeout(() => remove(n.id), duration)
    timers.set(n.id, timerId)
  }

  function remove(id: number) {
    const timer = timers.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.delete(id)
    }

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
