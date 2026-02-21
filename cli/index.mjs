#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const REGISTRY_DIR = path.join(__dirname, '..', 'registry')
const REGISTRY_JSON = path.join(REGISTRY_DIR, 'registry.json')

const cwd = process.env.INIT_CWD || process.cwd()

// ---------- utils ----------

function readRegistry() {
  if (!fs.existsSync(REGISTRY_JSON)) {
    console.error('Registry not found')
    process.exit(1)
  }
  return JSON.parse(fs.readFileSync(REGISTRY_JSON, 'utf8'))
}

function ensureVueProject() {
  // Optional: could check for package.json or vue dependency
  // For now, just ensure cwd is writable
}

function copyFileSafe(src, dest) {
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

function listComponents() {
  const registry = readRegistry()
  console.log('Available components:\n')
  Object.keys(registry).forEach((name) => {
    console.log(`  ${name}`)
  })
}

function addComponent(name) {
  const registry = readRegistry()
  const entry = registry[name]

  if (!entry) {
    console.error(`Component not found: ${name}\n`)
    listComponents()
    process.exit(1)
  }

  // Auto-install styles if not present
  const stylesPath = path.join(cwd, 'src', 'styles')
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
  const destDir = path.join(cwd, 'src/components/ui', name)

  entry.files.forEach((file) => {
    const src = path.join(srcDir, file)
    const dest = path.join(destDir, file)
    copyFileSafe(src, dest)
  })

  console.log(`\n✔ ${name} installed`)
}

function init() {
  const stylesDest = path.join(cwd, 'src', 'styles')
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

if (!command) {
  console.log(`
artharexian-ui

Usage:
  npx artharexian-ui init
  npx artharexian-ui add <component>
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
