import fs from 'node:fs'
import path from 'node:path'

import { STYLES_FILES, GITHUB_RAW, cwd } from './constants.js'
import { detectProject, loadConfig, saveConfig } from './utils/config.js'
import { fetchFile } from './utils/fetch.js'
import { log } from './utils/logger.js'

async function downloadStyles(stylesDir) {
  log.bold('\nAdding styles...')
  fs.mkdirSync(stylesDir, { recursive: true })

  for (const file of STYLES_FILES) {
    const url = `${GITHUB_RAW}/src/styles/${file}`
    const destPath = path.join(stylesDir, file)

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

function getDefaultStylesDir() {
  const hasSrc = fs.existsSync(path.join(cwd, 'src'))
  const base = hasSrc ? 'src/app/styles' : 'styles'
  const stylesPath = path.join(cwd, base)

  if (fs.existsSync(stylesPath)) {
    const dir = path.dirname(base)
    return path.join(dir, 'rxn-styles')
  }
  return base
}

export async function init(cmdOptions = {}) {
  const configPath = path.join(cwd, 'rxn-ui.json')

  if (fs.existsSync(configPath)) {
    const existing = loadConfig()
    log.info(`
Already initialized at ${configPath}
Components: ${existing.components}
Assets: ${existing.assets}`)
    return
  }

  const config = detectProject()

  if (cmdOptions.components) {
    config.components = cmdOptions.components
  }
  if (cmdOptions.composables) {
    config.composables = cmdOptions.composables
  }
  if (cmdOptions.assets) {
    config.assets = cmdOptions.assets
  }
  if (cmdOptions.utils) {
    config.utils = cmdOptions.utils
  }

  saveConfig(config)
  log.success('rxn-ui initialized')
  log(`\n
Configuration saved to ${configPath}
  Components: ${config.components}
  Composables: ${config.composables}
  Assets: ${config.assets}
  Utils: ${config.utils}`)

  // Download styles to default location
  const stylesDir = path.join(cwd, getDefaultStylesDir())
  await downloadStyles(stylesDir)

  log(`\nNow you can add components:
  npx rxn-ui add button-base`)
}
