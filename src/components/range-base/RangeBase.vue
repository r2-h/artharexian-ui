<script setup lang="ts">
import { computed, ref } from 'vue'

import { useVars } from '../../composables/useWars'
import { cssSizeToNumber } from '../../utils/cssSizeToNumber'

const {
  variant = 'default',
  min = 0,
  max = 100,
  showThumb = true,
  vars = { thumb: { size: '2rem' } },
} = defineProps<{
  min?: number
  max?: number
  variant?: 'default' | 'secondary'
  showThumb?: boolean
  cls?: { input?: string; progress?: string }
  vars?: { progress?: { height?: string }; thumb?: { size?: string } }
}>()

const rangeValue = ref(50)

const progressPercent = computed(() => {
  const percent = ((rangeValue.value - min) / (max - min)) * 100
  const thumbOffset = (0.5 - percent / 100) * cssSizeToNumber(vars.thumb?.size)
  return showThumb ? `calc(${percent}% + ${thumbOffset}rem)` : `${percent}%`
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

const thumbSize = computed(() => (showThumb ? vars.thumb?.size : '0rem'))

const varsStyle = useVars('range', [vars])
</script>

<template>
  <div class="container" :style="varsStyle">
    <div class="wrapper">
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
  position: relative;
  width: 100%;
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
