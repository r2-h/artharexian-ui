import { computed } from 'vue'

export function useVars(component: string, varsList: any[]) {
  return computed(() => {
    const result: Record<string, string> = {}

    for (const vars of varsList) {
      if (!vars) continue

      for (const slot in vars) {
        const slotVars = vars[slot]
        if (!slotVars) continue

        for (const key in slotVars) {
          const cssVar = `--${component}-${slot}-${key}`
          result[cssVar] = slotVars[key]
        }
      }
    }

    return result
  })
}
