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
  showThumb = true,
  ...props
} = defineProps<RangeBaseProps>()
const vars = computed(() =>
  mergeDefaultProps<RangeBaseVars>({ thumb: { size: '2rem' } }, props.vars),
)

const rangeValue = ref(50)

const progressPercent = computed(() => {
  const percent = ((rangeValue.value - min) / (max - min)) * 100
  const thumbOffset = (0.5 - percent / 100) * cssSizeToNumber(vars.value.thumb?.size)
  console.log(
    cssValueToUnit(vars.value.thumb?.size),
    `calc(${percent}% + ${thumbOffset}${cssValueToUnit(vars.value.thumb?.size)})`,
  )
  return showThumb
    ? `calc(${percent}% + ${thumbOffset}${cssValueToUnit(vars.value.thumb?.size)})`
    : `${percent}%`
})

const progressBackground = computed(() => {
  let gradientColor
  if (variant === 'secondary')
    gradientColor = {
      start: 'var(--muted)',
      end: `color-mix(in oklch, var(--muted), transparent 70%)`,
    }
  else
    gradientColor = {
      start: 'var(--primary)',
      end: `color-mix(in oklch, var(--primary), transparent 70%)`,
    }

  return `linear-gradient(to left, ${gradientColor.start}, ${gradientColor.end})`
})

const thumbSize = computed(() => {
  if (!showThumb) return '0px'
  return typeof vars.value.thumb?.size === 'number'
    ? `${vars.value.thumb?.size}px`
    : vars.value.thumb?.size
})

const varsStyle = useVars('range', [vars.value])
</script>

<template>
  <div :class="['container', cls?.container]" :style="varsStyle">
    <div :class="['wrapper', cls?.wrapper]">
      <div :class="['progress', cls?.progress]" :style="{ width: progressPercent }" />

      <input
        v-model="rangeValue"
        type="range"
        :min="min"
        :max="max"
        :class="['range-input', { 'hide-thumb': !showThumb }, cls?.input]"
      />
    </div>
    <output class="output" :style="{ minWidth: `${String(max).length}ch` }">
      {{ rangeValue }}
    </output>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}
.wrapper {
  box-shadow: var(--shadow-inset);
  border-radius: calc(1px * Infinity);
  height: var(--range-progress-height, 1.6rem);
  width: var(--range-progress-width, 100%);
  position: relative;
  display: flex;
  align-items: center;
}
.progress {
  height: 100%;
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
  outline-offset: 0.3rem;
}
.range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
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
  height: v-bind(thumbSize);
  aspect-ratio: 1;
  border-radius: calc(1px * Infinity);
  background-color: var(--background);
  border: 1px solid var(--color-highlight);
  box-shadow: var(--shadow-inset);
  transition: box-shadow 250ms ease-out;
}
.range-input:not(.hide-thumb)::-webkit-slider-thumb {
  cursor: grab;
}
.range-input:not(.hide-thumb)::-moz-range-thumb {
  cursor: grab;
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
.output {
  font-size: 1.5rem;
  font-weight: bold;
  font-variant-numeric: tabular-nums;
}
</style>
