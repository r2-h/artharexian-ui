export type InputProps = {
  disabled?: boolean
  cls?: { container?: string; error?: string; input?: string }
  error?: string
  defaultErrorMessage?: string
  isPending?: boolean
  modelValue?: string
}

export type InputEmits = {
  (e: 'update:modelValue', value: string): void
}
