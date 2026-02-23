import fs from 'node:fs'
import path from 'node:path'

import { cwd, STYLES_FILES, getRegistryUrl } from './constants.js'
import { loadConfig } from './utils/config.js'
import { fetchFile, fetchJSON } from './utils/fetch.js'
import { getSourceUrl } from './utils/getSourceUrl.js'
import { log } from './utils/logger.js'

export async function add(name, cmdOptions = {}) {
  const config = loadConfig()
  if (!config) {
    log.error('Not initialized. Run: npx rxn-ui init')
    process.exit(1)
  }

  const tag = cmdOptions.tag || null
  const registryUrl = getRegistryUrl(tag)

  let registry
  try {
    registry = await fetchJSON(registryUrl)
  } catch (err) {
    log.error(`Failed to fetch registry: ${err.message}`)
    process.exit(1)
  }

  const entry = registry[name]
  if (!entry) {
    log.error(`Component "${name}" not found`)
    log.info(`Available components: ${Object.keys(registry).join(', ')}`)
    process.exit(1)
  }

  const type = name.startsWith('use-') ? 'composables' : 'components'
  const itemsToDownload = [
    { type, name, files: entry.files, dir: config[type] },
    { type: 'styles', name: null, files: STYLES_FILES, dir: config.styles },
  ]

  log.bold(`\nAdding ${name}...`)

  for (const item of itemsToDownload) {
    const destDir = path.join(cwd, item.dir)
    fs.mkdirSync(destDir, { recursive: true })
    await downloadItems({ type: item.type, name: item.name, files: item.files, tag, destDir })
  }

  if (entry.imports) {
    log.bold(`\nUsage:`)
    for (const imp of entry.imports) {
      log(`  ${imp}`)
    }
  }
}

async function downloadItems({ type, name, files, tag, destDir }) {
  log.bold(`\nAdding ${type}...`)
  for (const file of files) {
    const url = getSourceUrl(type, name, file, tag)
    const destDirNested = name ? path.join(destDir, name) : destDir
    const destPath = path.join(destDirNested, file)

    try {
      const content = await fetchFile(url)
      fs.mkdirSync(destDirNested, { recursive: true })
      fs.writeFileSync(destPath, content)
      log.success(`Added ${path.relative(cwd, destPath)}`)
    } catch (err) {
      log.error(`Failed to download ${file}: ${err.message}`)
    }
  }
}
