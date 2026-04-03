import fs from 'node:fs'
import path from 'node:path'

import { STYLES_FILES, GITHUB_RAW, cwd } from './constants.js'
import { detectProject, loadConfig, saveConfig } from './utils/config.js'
import { downloadItems } from './add.js'
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

export async function init(cmdOptions = {}) {
  const configPath = path.join(cwd, 'rxn-ui.json')

  if (fs.existsSync(configPath)) {
    const existing = loadConfig()
    log.info(`
Already initialized at ${configPath}
Components: ${existing.components}
Styles: ${existing.styles}
Assets: ${existing.assets}`)
    return
  }

  const config = detectProject()

  if (cmdOptions.components) {
    config.components = cmdOptions.components
  }
  if (cmdOptions.styles) {
    config.styles = cmdOptions.styles
  } else {
    config.styles = 'styles'
  }
  if (cmdOptions.composables) {
    config.composables = cmdOptions.composables
  }

  // Check if styles dir exists, use 'rxn-styles' prefix to avoid conflicts
  const stylesPath = path.join(cwd, config.styles)
  if (fs.existsSync(stylesPath)) {
    const base = path.basename(config.styles)
    const dir = path.dirname(config.styles)
    config.styles = path.join(dir, `rxn-${base}`)
    log.info(`Styles directory "${config.styles}" (prefixed to avoid conflict)`)
  }

  saveConfig(config)
  log.success('rxn-ui initialized')
  log(`\n
Configuration saved to ${configPath}
  Components: ${config.components}
  Styles: ${config.styles}
  Composables: ${config.composables}
  Assets: ${config.assets}
  Utils: ${config.utils}`)

  // Download styles
  const stylesDir = path.join(cwd, config.styles)
  await downloadStyles(stylesDir)

  log(`\nNow you can add components:
  npx rxn-ui add button-base`)
}
