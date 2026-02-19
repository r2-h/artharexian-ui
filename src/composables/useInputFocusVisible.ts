import { onMounted, onUnmounted, ref } from 'vue'

export const useInputFocusVisible = () => {
  const isKeyboardFocus = ref(false)
  const inputRef = ref<HTMLInputElement | null>(null)

  let lastInteractionWasKeyboard = false

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') lastInteractionWasKeyboard = true
  }

  const onMouseDown = () => {
    lastInteractionWasKeyboard = false
  }

  const onFocus = () => {
    isKeyboardFocus.value = lastInteractionWasKeyboard
  }

  const onBlur = () => {
    isKeyboardFocus.value = false
  }

  onMounted(() => {
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('mousedown', onMouseDown)
    if (inputRef.value) {
      inputRef.value.addEventListener('focus', onFocus)
      inputRef.value.addEventListener('blur', onBlur)
    }
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('mousedown', onMouseDown)
    if (inputRef.value) {
      inputRef.value.removeEventListener('focus', onFocus)
      inputRef.value.removeEventListener('blur', onBlur)
    }
  })

  return { inputRef, isKeyboardFocus }
}
