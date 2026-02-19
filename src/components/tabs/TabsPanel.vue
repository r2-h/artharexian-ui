<script lang="ts" setup>
import { computed } from 'vue'

import { useTabsContext } from './context'

const props = defineProps<{ value: string }>()
const { activeTab } = useTabsContext()

const isActive = computed(() => activeTab.value === props.value)
</script>

<template>
  <section v-if="isActive" class="content">
    <slot />
  </section>
</template>
