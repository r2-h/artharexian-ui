export const cssSizeToNumber = (value: string | number | undefined): number => {
  if (!value) throw new Error('cssSizeToNumber')
  if (typeof value === 'number') return value

  const formatted = value.replace(/\p{L}/gu, '')
  return Number(formatted)
}

export const cssValueToUnit = (value: string | number | undefined): string => {
  if (!value) return ''
  if (typeof value === 'number') return 'px'

  const formatted = value.replace(/\d/g, '')
  return formatted
}
