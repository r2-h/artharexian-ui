export function mergeDefaultProps<T extends Record<string, any>>(
  defaults: T,
  prop?: { [K in keyof T]: T[K] },
): T {
  const result = { ...defaults }

  if (!prop) return result

  for (const key in prop) {
    if (prop[key]) result[key] = { ...result[key], ...prop[key] }
  }

  return result
}
