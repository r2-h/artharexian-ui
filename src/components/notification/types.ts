export type NotificationType = 'success' | 'error' | 'warning' | 'info'
export type NotificationSide = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export type NotificationState = {
  message: string
  id: number
  type?: NotificationType
  side?: NotificationSide
  duration?: number
  description?: string
  undoHandler?: VoidFunction
}

export type NotificationContainerProps = { side: NotificationSide }
export type NotificationItemProps = Pick<
  NotificationState,
  'id' | 'message' | 'type' | 'description' | 'undoHandler'
>
export type UseNotificationOptions = Partial<Omit<NotificationState, 'message'>>
