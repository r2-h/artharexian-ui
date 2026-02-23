import process from 'node:process'

export const GITHUB_REPO = 'r2-h/artharexian-ui'
export const GITHUB_RAW = `https://raw.githubusercontent.com/${GITHUB_REPO}/main`

export const cwd = process.env.INIT_CWD || process.cwd()
export const STYLES_FILES = ['style.css', 'variables.css']

export function getRegistryUrl(tag) {
  return tag ? `${GITHUB_RAW}/cli/registry.json?ref=${tag}` : `${GITHUB_RAW}/cli/registry.json`
}
