import { GITHUB_RAW } from '../constants.js'

export function getSourceUrl(type, componentName, file) {
  const paths = {
    components: componentName
      ? `/src/components/${componentName}/${file}`
      : `/src/components/${file}`,
    composables: componentName
      ? `/src/composables/${componentName}/${file}`
      : `/src/composables/${file}`,
    styles: `/src/styles/${file}`,
  }
  return `${GITHUB_RAW}${paths[type]}`
}
