#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const args = process.argv.slice(2)
const command = args[0]
const component = args[1]

const cwd = process.cwd()

// Try installed package first, then fallback to local components (for development)
let registryRoot = path.resolve(cwd, 'node_modules/artharexian-ui/registry')
if (!fs.existsSync(registryRoot)) {
  const localRegistry = path.resolve(__dirname, '../src/components')
  if (fs.existsSync(localRegistry)) {
    registryRoot = localRegistry
  }
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const file of fs.readdirSync(src)) {
    const s = path.join(src, file)
    const d = path.join(dest, file)
    if (fs.statSync(s).isDirectory()) {
      copyDir(s, d)
    } else {
      fs.copyFileSync(s, d)
    }
  }
}

function ensureCssImport() {
  const mainTs = path.resolve(cwd, 'src/main.ts')
  const mainJs = path.resolve(cwd, 'src/main.js')
  const mainFile = fs.existsSync(mainTs) ? mainTs : fs.existsSync(mainJs) ? mainJs : null

  if (!mainFile) return

  let code = fs.readFileSync(mainFile, 'utf8')

  // Check if local styles import exists
  if (code.includes('./styles/style.css') || code.includes('@/styles/style.css')) return

  code = `import './styles/style.css'\n` + code
  fs.writeFileSync(mainFile, code)
  console.log('✔ Style import added to src/main')
}

function copyStyles() {
  const stylesSrc = path.resolve(cwd, 'node_modules/artharexian-ui/src/styles')
  const stylesDst = path.resolve(cwd, 'src/styles')

  if (!fs.existsSync(stylesSrc)) {
    console.log('⚠ Styles not found in package')
    return
  }

  fs.mkdirSync(stylesDst, { recursive: true })
  
  // Copy all CSS files from package to project
  for (const file of fs.readdirSync(stylesSrc)) {
    if (file.endsWith('.css')) {
      const srcFile = path.join(stylesSrc, file)
      const dstFile = path.join(stylesDst, file)
      fs.copyFileSync(srcFile, dstFile)
      console.log(`✔ ${file} installed to src/styles/${file}`)
    }
  }
}

if (!command) {
  console.log('Usage: artharexian-ui <add|eject|init> [component]')
  console.log('')
  console.log('Commands:')
  console.log('  add <component>      Add a component to your project')
  console.log('  eject <component>    Alias for add (eject component source)')
  console.log('  init                 Initialize library (copy styles, configure)')
  console.log('')
  console.log('Examples:')
  console.log('  npx artharexian-ui add button-base')
  console.log('  npx artharexian-ui init')
  process.exit(0)
}

// Handle init command (auto-run on npm install)
if (command === 'init') {
  console.log('Initializing artharexian-ui...')
  copyStyles()
  ensureCssImport()
  console.log('')
  console.log('✔ artharexian-ui initialized successfully!')
  process.exit(0)
}

if (!component) {
  console.error('Error: Component name required')
  console.error('Usage: artharexian-ui add <component>')
  process.exit(1)
}

const src = path.join(registryRoot, component)

if (!fs.existsSync(src)) {
  console.error(`Error: Component not found: ${component}`)
  console.error('')
  console.error('Available components:')
  try {
    const components = fs.readdirSync(registryRoot)
    components.forEach((c) => console.error(`  - ${c}`))
  } catch {
    console.error('  (unable to list registry)')
  }
  process.exit(1)
}

const dst = path.resolve(cwd, 'src/components/ui', component)

copyDir(src, dst)

console.log(`✔ ${component} added to src/components/ui/${component}`)

ensureCssImport()

console.log('')
console.log('Next steps:')
console.log(`  1. Import the component: import { ButtonBase } from '@/components/ui/${component}'`)
console.log('  2. Make sure your CSS variables are configured (see docs)')
