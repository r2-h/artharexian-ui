import fs from 'node:fs'
import path from 'node:path'

import { cwd } from './constants.js'
import { detectProject, loadConfig, saveConfig } from './utils/config.js'
import { log } from './utils/logger.js'

export async function init(cmdOptions = {}) {
  const configPath = path.join(cwd, 'rxn-ui.json')

  if (fs.existsSync(configPath) && !cmdOptions.overwrite) {
    const existing = loadConfig()
    log.info(`
Already initialized at ${configPath}
Components: ${existing.components}
Styles: ${existing.styles}`)
    log('\nTo reinitialize, run: npx rxn-ui init --overwrite')
    return
  }

  const config = detectProject()

  if (cmdOptions.components) {
    config.components = cmdOptions.components
  }
  if (cmdOptions.styles) {
    config.styles = cmdOptions.styles
  }
  if (cmdOptions.composables) {
    config.composables = cmdOptions.composables
  }

  saveConfig(config)
  log.success('rxn-ui initialized')
  log(`\n
Configuration saved to ${configPath}
  Components: ${config.components}
  Styles: ${config.styles}
  Composables: ${config.composables}\n
Now you can add components:
  npx rxn-ui add button-base`)
}
