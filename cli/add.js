import fs from 'node:fs'
import path from 'node:path'

import { cwd, getRegistryUrl } from './constants.js'
import { loadConfig } from './utils/config.js'
import { fetchFile, fetchJSON } from './utils/fetch.js'
import { getSourceUrl } from './utils/getSourceUrl.js'
import { log } from './utils/logger.js'

// Patterns to detect and rewrite import paths
const IMPORT_PATTERNS = [
  { type: 'assets', regex: /\.\.\/\.\.\/assets\//g },
  { type: 'assets', regex: /@\/assets\//g },
  { type: 'composables', regex: /\.\.\/\.\.\/composables\//g },
  { type: 'utils', regex: /\.\.\/\.\.\/utils\//g },
  { type: 'components', regex: /\.\.\/([\w-]+)\//g },
]

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

  // Скачиваем зависимости (assets, composables, utils)
  const depDirs = await downloadDependencies(entry, config)

  // Скачиваем компонентные зависимости
  if (entry.components) {
    for (const compName of entry.components) {
      const compEntry = registry[compName]
      if (!compEntry) {
        log.error(`Dependency "${compName}" not found`)
        continue
      }
      await addDependency(compName, compEntry, config)
    }
  }

  // Скачиваем файлы компонента
  await downloadItems({
    type: entry.type,
    componentName,
    files: entry.files,
    destDir,
  })

  // Переписываем импорты в файлах компонента
  rewriteImports(entry.files, destDir, depDirs, isMultipleFiles)
}

async function addDependency(compName, compEntry, config) {
  const isMultipleFiles = compEntry.files.length > 1
  const destDir = isMultipleFiles
    ? path.join(cwd, config[compEntry.type], compName)
    : path.join(cwd, config[compEntry.type])

  log.bold(`\nAdding dependency ${compName}...`)

  // Скачиваем зависимости компонента
  const depDirs = await downloadDependencies(compEntry, config)

  // Скачиваем файлы
  await downloadItems({
    type: compEntry.type,
    componentName: compName,
    files: compEntry.files,
    destDir,
  })

  // Переписываем импорты
  rewriteImports(compEntry.files, destDir, depDirs, isMultipleFiles)
}

async function downloadDependencies(entry, config) {
  const deps = entry.dependencies
  if (!deps) return {}

  const depDirs = {}

  for (const [type, files] of Object.entries(deps)) {
    const destDir = path.join(cwd, config[type])
    depDirs[type] = destDir

    await downloadItems({
      type,
      componentName: null,
      files,
      destDir,
    })
  }

  return depDirs
}

function rewriteImports(files, destDir, depDirs, isMultipleFiles) {
  for (const file of files) {
    const filePath = path.join(destDir, file)
    if (!fs.existsSync(filePath)) continue

    let content = fs.readFileSync(filePath, 'utf8')

    for (const { type, regex } of IMPORT_PATTERNS) {
      if (!depDirs[type]) continue

      // Reset regex lastIndex
      regex.lastIndex = 0

      if (!regex.test(content)) continue
      regex.lastIndex = 0

      // Calculate relative path from component file to dependency dir
      const fileDir = isMultipleFiles ? destDir : path.dirname(filePath)
      const relPath = path.relative(fileDir, depDirs[type]).replace(/\\/g, '/')
      const importPath = relPath.startsWith('.') ? relPath : `./${relPath}`

      if (type === 'components') {
        // For component imports like ../button-base/ -> ./button-base/
        content = content.replace(regex, (match, compName) => {
          return `${importPath}/${compName}/`
        })
      } else {
        content = content.replace(regex, `${importPath}/`)
      }
    }

    fs.writeFileSync(filePath, content)
  }
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
