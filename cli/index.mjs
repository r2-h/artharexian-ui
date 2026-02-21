#!/usr/bin/env node
/**
 * artharexian-ui CLI
 * 
 * Component installer for artharexian-ui library.
 * Downloads components from the registry and installs them to the user's project.
 * 
 * Commands:
 *   init              - Install global styles
 *   add <component>   - Add a component to the project
 *   list              - List available components
 * 
 * Config:
 *   Create artharexian-ui.json in project root to customize paths:
 *   {
 *     "components": "src/components/ui"
 *   }
 */

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Registry location (inside the npm package)
const REGISTRY_DIR = path.join(__dirname, '..', 'registry')
const REGISTRY_JSON = path.join(REGISTRY_DIR, 'registry.json')

// Current working directory (where user runs the command)
const cwd = process.env.INIT_CWD || process.cwd()

// Default configuration
const DEFAULT_CONFIG = {
  components: 'src/components/ui',
  styles: 'src/styles'
}

/**
 * Load user configuration from artharexian-ui.json
 * Auto-creates config if it doesn't exist
 */
function ensureConfig() {
  const configPath = path.join(cwd, 'artharexian-ui.json')

  if (!fs.existsSync(configPath)) {
    saveConfig(DEFAULT_CONFIG)
    console.log('Created artharexian-ui.json')
  }

  return loadConfig()
}

/**
 * Load user configuration from artharexian-ui.json
 * Returns defaults if config doesn't exist (shouldn't happen after ensureConfig)
 */
function loadConfig() {
  const configPath = path.join(cwd, 'artharexian-ui.json')
  if (fs.existsSync(configPath)) {
    try {
      const userConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'))
      return { ...DEFAULT_CONFIG, ...userConfig }
    } catch {
      console.warn('Warning: Invalid artharexian-ui.json, using defaults')
    }
  }
  return DEFAULT_CONFIG
}

/**
 * Save configuration to artharexian-ui.json
 */
function saveConfig(config) {
  const configPath = path.join(cwd, 'artharexian-ui.json')
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n')
}

/**
 * Read and validate registry.json
 * @returns {Object} Registry data
 */
function readRegistry() {
  if (!fs.existsSync(REGISTRY_JSON)) {
    console.error('Registry not found')
    process.exit(1)
  }
  try {
    return JSON.parse(fs.readFileSync(REGISTRY_JSON, 'utf8'))
  } catch {
    console.error('Invalid registry.json')
    process.exit(1)
  }
}

/**
 * Copy file from registry to destination
 * Skips if file already exists
 * @param {string} src - Source path in registry
 * @param {string} dest - Destination path in user project
 */
function copyFileSafe(src, dest) {
  if (!fs.existsSync(src)) {
    console.error(`Missing file in registry: ${path.basename(src)}`)
    process.exit(1)
  }
  if (fs.existsSync(dest)) {
    const rel = path.relative(cwd, dest)
    console.log(`skip ${rel} (exists)`)
    return
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.copyFileSync(src, dest)
  const rel = path.relative(cwd, dest)
  console.log(`add  ${rel}`)
}

// ---------- commands ----------

/**
 * List all available components from registry
 */
function listComponents() {
  const registry = readRegistry()
  console.log('Available components:\n')
  Object.keys(registry).forEach((name) => {
    console.log(`  ${name}`)
  })
}

/**
 * Add a component to the user's project
 * Auto-installs styles and config if needed
 * @param {string} name - Component name
 */
function addComponent(name) {
  const config = ensureConfig()
  const registry = readRegistry()
  const entry = registry[name]

  if (!entry) {
    console.error(`Component not found: ${name}\n`)
    listComponents()
    process.exit(1)
  }

  // Auto-install registry styles if not present
  const stylesPath = path.join(cwd, config.styles)
  const registryStyles = path.join(REGISTRY_DIR, 'styles')
  if (!fs.existsSync(stylesPath) && fs.existsSync(registryStyles)) {
    console.log('Styles not found. Installing...\n')
    fs.mkdirSync(stylesPath, { recursive: true })
    for (const file of fs.readdirSync(registryStyles)) {
      copyFileSafe(path.join(registryStyles, file), path.join(stylesPath, file))
    }
    console.log('')
  }

  const srcDir = path.join(REGISTRY_DIR, name)
  const destDir = path.join(cwd, config.components, name)

  entry.files.forEach((file) => {
    const src = path.join(srcDir, file)
    const dest = path.join(destDir, file)
    copyFileSafe(src, dest)
  })

  console.log(`\n✔ ${name} installed`)
}

/**
 * Initialize artharexian-ui in the project (install global styles)
 * Deprecated: styles are auto-installed with components
 */
function init() {
  const config = ensureConfig()
  const stylesDest = path.join(cwd, config.styles)
  const registryStyles = path.join(REGISTRY_DIR, 'styles')

  if (!fs.existsSync(registryStyles)) {
    console.log('No global styles in registry')
    return
  }

  fs.mkdirSync(stylesDest, { recursive: true })

  for (const file of fs.readdirSync(registryStyles)) {
    copyFileSafe(path.join(registryStyles, file), path.join(stylesDest, file))
  }

  console.log('\n✔ styles installed')
}

// ---------- CLI ----------

const args = process.argv.slice(2)
const command = args[0]
const component = args[1]

if (!command || command === '--help' || command === '-h') {
  console.log(`
artharexian-ui - Component installer

Usage:
  npx artharexian-ui add <component>   Add a component (auto-installs styles)
  npx artharexian-ui list              List available components
  npx artharexian-ui init              Install styles only (optional)

Config:
  artharexian-ui.json is auto-created on first use.
  Customize paths:
  {
    "components": "src/components/ui",
    "styles": "src/styles"
  }

Examples:
  npx artharexian-ui add button-base
  npx artharexian-ui list
`)
  process.exit(0)
}

if (command === 'list') {
  listComponents()
  process.exit(0)
}

if (command === 'add') {
  if (!component) {
    console.error('Component name required')
    process.exit(1)
  }
  addComponent(component)
  process.exit(0)
}

if (command === 'init') {
  init()
  process.exit(0)
}

console.error(`Unknown command: ${command}`)
process.exit(1)
