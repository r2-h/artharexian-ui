import fs from 'node:fs'
import path from 'node:path'

const cwd = process.env.INIT_CWD || process.cwd()

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
    styles: hasSrc ? 'src/app/styles' : 'styles',
<<<<<<< HEAD
=======
    aliases: {
      '@': '.',
      '@components': hasSrc ? 'src/shared/components' : 'components',
      '@styles': hasSrc ? 'src/app/styles' : 'styles',
    },
>>>>>>> 5ad45b5eea21858c41198b6c8c3bfd2d6ce8f182
  }
}
