import { GITHUB_RAW } from '../constants.js'

export function getSourceUrl(type, componentName, file) {
  const paths = {
    components: componentName
      ? `/src/components/${componentName}/${file}`
      : `/src/components/${file}`,
    composables: componentName
      ? `/src/composables/${componentName}/${file}`
      : `/src/composables/${file}`,
    assets: `/src/assets/${file}`,
    utils: `/src/utils/${file}`,
  }
  return `${GITHUB_RAW}${paths[type]}`
}
