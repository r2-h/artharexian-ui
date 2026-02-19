import type { Preview } from '@storybook/vue3-vite'

import '../src/styles/style.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        icon: 'circlehollow',
        title: 'Theme',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },

  // Обновляем тему при каждом рендере и вызываем forceRemount при изменении
  decorators: [
    (story, context) => {
      document.documentElement.setAttribute('data-theme', context.globals.theme || 'dark')

      if (context.forceRemount) context.forceRemount()

      return story(context)
    },
  ],
}

export default preview
