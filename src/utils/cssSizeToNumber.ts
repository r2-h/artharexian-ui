export const cssSizeToNumber = (str: string | undefined) => {
  if (!str) return 1

  const formatted = str.replace(/\p{L}/gu, '')
  return Number(formatted)
}
