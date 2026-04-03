import fs from 'node:fs'
import path from 'node:path'

import { STYLES_FILES, cwd } from './constants.js'
import { detectProject, loadConfig, saveConfig } from './utils/config.js'
import { downloadItems } from './add.js'
import { log } from './utils/logger.js'

export async function init(cmdOptions = {}) {
  const configPath = path.join(cwd, 'rxn-ui.json')

  if (fs.existsSync(configPath)) {
    const existing = loadConfig()
    log.info(`
Already initialized at ${configPath}
Components: ${existing.components}
Styles: ${existing.styles}`)
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
  Composables: ${config.composables}`)

  // Download styles
  const stylesDir = path.join(cwd, config.styles)
  await downloadItems({
    type: 'styles',
    componentName: null,
    files: STYLES_FILES,
    destDir: stylesDir,
  })

  log(`\nNow you can add components:
  npx rxn-ui add button-base`)
}
