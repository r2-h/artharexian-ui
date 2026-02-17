<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    thumbSize?: number
    min?: number
    max?: number
    variant?: 'default' | 'secondary'
  }>(),
  {
    variant: 'default',
    thumbSize: 2,
    min: 0,
    max: 100,
  },
)

const rangeValue = ref(50)

const trackStyle = computed(() => {
  const percent = (rangeValue.value - props.min) / (props.max - props.min)
  const thumbOffset = (0.5 - percent) * props.thumbSize
  const gradientBorder = `calc(${percent * 100}% + ${thumbOffset}rem)`

  let gradientColor
  if (props.variant === 'secondary')
    gradientColor = { start: 'var(--muted)', end: `color-mix(in oklch, var(--muted), white 25%)` }
  else
    gradientColor = {
      start: 'var(--primary)',
      end: `color-mix(in oklch, var(--primary), white 25%)`,
    }

  return `linear-gradient(
    to right, 
    ${gradientColor.start} 0%,
    ${gradientColor.end} ${gradientBorder},
    transparent ${gradientBorder},
    transparent 100%
  )`
})

const outsetWidth = computed(() => String(Math.abs(props.max)).length)
</script>

<template>
  <div class="container">
    <div class="wrapper">
      <input
        v-model="rangeValue"
        type="range"
        :min="min"
        :max="max"
        class="range"
        :style="{ background: trackStyle }"
      />
    </div>
    <output class="output">{{ rangeValue }}</output>
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
  height: 1.6rem;
  display: grid;
  place-content: stretch;
  align-items: center;
  width: 100%;
}
.range {
  -webkit-appearance: none;
  appearance: none;
  height: 1.6rem;
  border-radius: calc(1px * Infinity);
  outline-offset: 0.3rem;
}

.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  border-radius: calc(1px * Infinity);
  height: calc(v-bind(thumbSize) * 1rem);
  aspect-ratio: 1;
  background-color: var(--background);
  border: 1px solid var(--color-highlight);
  box-shadow: var(--shadow-inset);
  cursor: pointer;
  transition: box-shadow 250ms ease-out;
}
.range::-moz-range-thumb {
  -webkit-appearance: none;
  border-radius: calc(1px * Infinity);
  height: calc(v-bind(thumbSize) * 1rem);
  aspect-ratio: 1;
  background-color: var(--background);
  border: 1px solid var(--color-highlight);
  box-shadow: var(--shadow-inset);
  cursor: pointer;
  transition: box-shadow 250ms ease-out;
}

.range:active::-webkit-slider-thumb {
  /* box-shadow: var(--shadow-raised); */
}
.range:active::-moz-range-thumb {
  box-shadow: var(--shadow-raised);
}

.output {
  font-size: 1.5rem;
  font-weight: bold;
  font-variant-numeric: tabular-nums;
  min-width: calc(v-bind(outsetWidth) * 1ch);
}
</style>
