import fs from 'node:fs'
import path from 'node:path'

import { cwd, getRegistryUrl } from './constants.js'
import { loadConfig } from './utils/config.js'
import { fetchFile, fetchJSON } from './utils/fetch.js'
import { getSourceUrl } from './utils/getSourceUrl.js'
import { log } from './utils/logger.js'

export async function add(componentName, cmdOptions = {}) {
  const config = loadConfig()
  if (!config) {
    log.error('Not initialized. Run: npx rxn-ui init')
    process.exit(1)
  }

  const registryUrl = getRegistryUrl()

  let registry
  try {
    registry = await fetchJSON(registryUrl)
  } catch (err) {
    log.error(`Failed to fetch registry: ${err.message}`)
    process.exit(1)
  }

  const entry = registry[componentName]
  if (!entry) {
    log.error(`Component "${componentName}" not found`)
    log.info(`Available components: ${Object.keys(registry).join(', ')}`)
    process.exit(1)
  }

  // Если файлов больше одного — скачиваем в папку с именем компонента
  const isMultipleFiles = entry.files.length > 1
  const destDir = isMultipleFiles
    ? path.join(cwd, config[entry.type], componentName)
    : path.join(cwd, config[entry.type])

  log.bold(`\nAdding ${componentName}...`)

  // Скачиваем файлы компонента
  await downloadItems({
    type: entry.type,
    componentName: isMultipleFiles ? componentName : null,
    files: entry.files,
    destDir,
  })
}

export async function downloadItems({ type, componentName, files, destDir }) {
  log.bold(`\nAdding ${type}...`)
  fs.mkdirSync(destDir, { recursive: true })

  for (const file of files) {
    const url = getSourceUrl(type, componentName, file)
    const destPath = path.join(destDir, file)

    if (fs.existsSync(destPath)) {
      log.info(`Skipping ${path.relative(cwd, destPath)} (already exists)`)
      continue
    }

    try {
      const content = await fetchFile(url)
      fs.writeFileSync(destPath, content)
      log.success(`Added ${path.relative(cwd, destPath)}`)
    } catch (err) {
      log.error(`Failed to download ${file}: ${err.message}`)
    }
  }
}
