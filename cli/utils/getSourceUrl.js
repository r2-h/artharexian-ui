import { GITHUB_RAW } from '../constants.js'

export function getSourceUrl(type, name, file, tag) {
  const ref = tag ? `?ref=${tag}` : ''
  const paths = {
    components: `/src/components/${name}/${file}`,
    composables: `/src/composables/${name}/${file}`,
    styles: `/src/styles/${file}`,
  }
  return `${GITHUB_RAW}${paths[type]}${ref}`
}
