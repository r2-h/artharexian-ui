import type { Meta, StoryObj } from '@storybook/vue3'

import ButtonBase from './ButtonBase.vue'
import type { ButtonProps } from './types'

const meta = {
  title: 'components/ButtonBase',
  component: ButtonBase,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'default', 'danger'] satisfies ButtonProps['variant'][],
    },
    shape: {
      control: 'select',
      options: ['radius-default', 'radius-circle'] satisfies ButtonProps['shape'][],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'] satisfies ButtonProps['type'][],
    },
    is: {
      control: 'select',
      options: ['button', 'a'],
    },
    // @ts-ignore: attribute
    disabled: {
      control: 'boolean',
    },
    isPending: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ButtonBase>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    default: 'Button',
  },
}

export const Primary: Story = {
  args: {
    default: 'Primary Button',
    variant: 'primary',
    isPending: false,
  },
}

export const Danger: Story = {
  args: {
    default: 'Danger Button',
    variant: 'danger',
  },
}

export const CircleShape: Story = {
  args: {
    default: '✓',
    shape: 'radius-circle',
  },
}

export const Disabled: Story = {
  args: {
    default: 'Disabled',
    // @ts-ignore: attribute
    disabled: true,
  },
}

export const Pending: Story = {
  args: {
    default: 'Loading...',
    isPending: true,
    variant: 'primary',
  },
}

export const AsLink: Story = {
  args: {
    default: 'Link Button',
    is: 'a',
    // @ts-ignore: attribute
    href: '#',
    variant: 'primary',
  },
}

export const AllVariants: Story = {
  render: () => ({
    components: { ButtonBase },
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <ButtonBase variant="default">Default</ButtonBase>
        <ButtonBase variant="primary">Primary</ButtonBase>
        <ButtonBase variant="danger">Danger</ButtonBase>
        <ButtonBase shape="radius-circle">✓</ButtonBase>
        <ButtonBase disabled>Disabled</ButtonBase>
        <ButtonBase isPending variant="primary">Pending</ButtonBase>
      </div>
    `,
  }),
}
