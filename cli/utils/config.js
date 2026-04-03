import fs from 'node:fs'
import path from 'node:path'

import { cwd } from '../constants.js'

export function loadConfig() {
  const configPath = path.join(cwd, 'rxn-ui.json')
  if (!fs.existsSync(configPath)) {
    return null
  }
  return JSON.parse(fs.readFileSync(configPath, 'utf8'))
}

export function saveConfig(config) {
  const configPath = path.join(cwd, 'rxn-ui.json')
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
}

export function detectProject() {
  const hasSrc = fs.existsSync(path.join(cwd, 'src'))
  return {
    components: hasSrc ? 'src/shared/components' : 'components',
    composables: hasSrc ? 'src/shared/composables' : 'composables',
    assets: hasSrc ? 'src/assets' : 'assets',
    utils: hasSrc ? 'src/shared/utils' : 'utils',
  }
}
