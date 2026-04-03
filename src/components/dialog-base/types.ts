export type DialogBaseProps = {
  portal?: string | null
  isOpen?: boolean
  id?: string
  cls?: string
  closedby?: 'any' | 'none' | 'closerequest'
}

export type DialogBaseEmits = { (e: 'onClose'): void; (e: 'onOpen'): void }
