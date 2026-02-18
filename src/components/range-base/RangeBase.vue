<script setup lang="ts">
import { computed, ref } from 'vue'

import { useVars } from '../../composables/useWars'
import { cssSizeToNumber, cssValueToUnit } from '../../utils/cssParser'
import { mergeDefaultProps } from '../../utils/mergeDefaultProps'
import type { RangeBaseProps, RangeBaseVars } from './types'

const {
  min = 0,
  max = 100,
  variant = 'default',
  hasThumb = true,
  isVertical = false,
  ...props
} = defineProps<RangeBaseProps>()

const vars = computed(() =>
  mergeDefaultProps<RangeBaseVars>({ thumb: { size: '2rem' } }, props.vars),
)

const range = ref(50)

const progressPercent = computed(() => {
  const percent = ((range.value - min) / (max - min)) * 100
  const thumbSize = cssSizeToNumber(vars.value.thumb?.size)
  const unit = cssValueToUnit(vars.value.thumb?.size)
  const thumbOffset = (0.5 - percent / 100) * thumbSize

  return hasThumb ? `calc(${percent}% + ${thumbOffset}${unit})` : `${percent}%`
})

const progressBackground = computed(() => {
  const color = variant === 'secondary' ? 'var(--muted)' : 'var(--primary)'
  const fade = `color-mix(in oklch, ${color}, transparent 70%)`
  return `linear-gradient(${isVertical ? 'to top' : 'to left'}, ${color}, ${fade})`
})

const thumbSize = computed(() => {
  if (!hasThumb) return '0px'
  return typeof vars.value.thumb?.size === 'number'
    ? `${vars.value.thumb?.size}px`
    : vars.value.thumb?.size
})

const varsStyle = useVars('range', [vars.value])

const progressStyle = computed(() => {
  return isVertical
    ? { height: progressPercent.value, width: '100%' }
    : { width: progressPercent.value, height: '100%' }
})
</script>

<template>
  <div :class="['container', { 'is-vertical': isVertical }, cls?.container]" :style="varsStyle">
    <div :class="['wrapper', cls?.wrapper]">
      <div :class="['progress', cls?.progress]" :style="progressStyle" />

      <input
        v-model="range"
        type="range"
        :min="min"
        :max="max"
        :class="['range-input', { 'hide-thumb': !hasThumb }, cls?.input]"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}
.container.is-vertical {
  width: fit-content;
  height: stretch;
  display: flex;
  flex-direction: vertical;
  align-items: end;
  & .wrapper {
    width: var(--range-progress-width, 1.6rem);
    height: var(--range-progress-height);
    /* Меняем ориентацию через writing-mode, но БЕЗ appearance: slider-vertical */
    writing-mode: bt-lr;
    writing-mode: vertical-lr;
    direction: rtl;
  }
}
.wrapper {
  box-shadow: var(--shadow-inset);
  border-radius: calc(1px * Infinity);
  width: var(--range-progress-width, 100%);
  height: var(--range-progress-height, 1.6rem);
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--background);
}
.progress {
  border-radius: calc(1px * Infinity);
  background: v-bind(progressBackground);
  position: absolute;
}

.range-input {
  -webkit-appearance: none;
  appearance: none;
  background: none;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: calc(1px * Infinity);
  outline-offset: 0.5rem;
}
.range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  cursor: grab;
  height: v-bind(thumbSize);
  aspect-ratio: 1;
  border-radius: calc(1px * Infinity);
  background-color: var(--background);
  border: 1px solid var(--color-highlight);
  box-shadow: var(--shadow-inset);
  transition: box-shadow 250ms ease-out;
}
.range-input::-moz-range-thumb {
  -webkit-appearance: none;
  cursor: grab;
  height: v-bind(thumbSize);
  aspect-ratio: 1;
  border-radius: calc(1px * Infinity);
  background-color: var(--background);
  border: 1px solid var(--color-highlight);
  box-shadow: var(--shadow-inset);
  transition: box-shadow 250ms ease-out;
}
.range-input.hide-thumb::-webkit-slider-thumb {
  cursor: default;
  visibility: hidden;
}
.range-input.hide-thumb::-moz-range-thumb {
  cursor: default;
  visibility: hidden;
}
.range-input:not(.hide-thumb):active::-webkit-slider-thumb {
  cursor: grabbing;
}

.range-input:active::-webkit-slider-thumb {
  box-shadow: var(--shadow-raised);
}
.range-input:active::-moz-range-thumb {
  box-shadow: var(--shadow-raised);
}
</style>
