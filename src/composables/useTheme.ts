import { ref } from 'vue'

export type Theme = 'light' | 'dark'

const LC_THEME = 'theme'
const currentTheme = ref<Theme>('dark')

export const initTheme = () => {
  const savedTheme = localStorage.getItem(LC_THEME) as Theme | null

  if (savedTheme) {
    currentTheme.value = savedTheme
    applyTheme(savedTheme)
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const systemTheme = prefersDark ? 'dark' : 'light'
    currentTheme.value = systemTheme
    applyTheme(systemTheme)
  }
}

const applyTheme = (theme: Theme) => {
  document.querySelector('html')?.setAttribute('data-theme', theme)
  localStorage.setItem(LC_THEME, theme)
  currentTheme.value = theme
}

export const toggleTheme = () => {
  const newTheme = currentTheme.value === 'dark' ? 'light' : 'dark'
  currentTheme.value = newTheme
  applyTheme(newTheme)
}

export const setTheme = (theme: Theme) => {
  currentTheme.value = theme
  applyTheme(theme)
}

export const getTheme = () => currentTheme.value

if (window.matchMedia) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  mediaQuery.addEventListener('change', (e) => {
    const newTheme = e.matches ? 'dark' : 'light'
    currentTheme.value = newTheme
    applyTheme(newTheme)
  })
}

export default function useTheme() {
  return {
    currentTheme,
    toggleTheme,
    setTheme,
    getTheme,
  }
}
