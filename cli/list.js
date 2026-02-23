import { getRegistryUrl } from './constants.js'
import { fetchJSON } from './utils/fetch.js'
import { log } from './utils/logger.js'

export async function list(cmdOptions = {}) {
  const tag = cmdOptions.tag || null
  const registryUrl = getRegistryUrl(tag)

  let registry
  try {
    registry = await fetchJSON(registryUrl)
  } catch (err) {
    log.error(`Failed to fetch registry: ${err.message}`)
    process.exit(1)
  }

  log(`\nAvailable components:\n`)

  const names = Object.keys(registry).sort()
  const maxLen = Math.max(...names.map((n) => n.length))

  for (const name of names) {
    const entry = registry[name]
    const desc = entry.description || ''
    const padded = name.padEnd(maxLen)
    log(`  ${padded}  ${desc}`)
  }

  log(`\nTo add a component: npx rxn-ui add <name>`)
}
