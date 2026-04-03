import { onBeforeUnmount } from 'vue'

import type { UseResize } from './types'

export const useResize = ({
  side,
  isResizing,
  maxWidth,
  setCurrentWidth,
  withResize,
}: UseResize) => {
  const MIN_WIDTH = 120
  let animationFrameId: number | null = null

  function startResizing() {
    isResizing.value = true

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', stopResizing)
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }
  function onMouseMove(e: MouseEvent) {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }

    animationFrameId = requestAnimationFrame(() => {
      const newWidth = side === 'left' ? e.clientX : window.innerWidth - e.clientX
      if (newWidth >= MIN_WIDTH && newWidth <= maxWidth) {
        setCurrentWidth(newWidth)
      }
    })
  }
  function stopResizing() {
    isResizing.value = false

    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }

    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', stopResizing)

    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }

  onBeforeUnmount(() => {
    if (withResize) stopResizing()
  })

  return startResizing
}
