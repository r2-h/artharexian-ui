#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import https from 'node:https'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const args = process.argv.slice(2)
const command = args[0]
const component = args[1]

const cwd = process.env.INIT_CWD || process.cwd()

// GitHub config
const GITHUB_REPO = 'r2-h/artharexian-ui'
const GITHUB_BRANCH = 'main'
const COMPONENTS_PATH = 'src/components'

const EXCLUDE_FILES = ['meta.json', 'index.stories.ts']

// Fetch JSON from GitHub
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'artharexian-ui-cli',
        'Accept': 'application/vnd.github.v3+json',
      },
    }
    https
      .get(url, options, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`))
          return
        }
        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => {
          try {
            resolve(JSON.parse(data))
          } catch (e) {
            reject(new Error(`Failed to parse JSON: ${e.message}`))
          }
        })
      })
      .on('error', reject)
  })
}

// Fetch file content from GitHub
function fetchFile(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => resolve(data))
      })
      .on('error', reject)
  })
}

// Get component files list from GitHub API
async function getComponentFiles(componentName) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${COMPONENTS_PATH}/${componentName}?ref=${GITHUB_BRANCH}`
  const data = await fetchJSON(url)
  return data.filter((file) => file.type === 'file' && !EXCLUDE_FILES.includes(file.name))
}

// Download and save file
async function downloadFile(file, destPath) {
  const content = await fetchFile(file.download_url)
  fs.writeFileSync(destPath, content)
}

// Copy directory locally (for development)
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const file of fs.readdirSync(src)) {
    if (EXCLUDE_FILES.includes(file)) continue

    const s = path.join(src, file)
    const d = path.join(dest, file)
    if (fs.statSync(s).isDirectory()) {
      copyDir(s, d)
    } else {
      fs.copyFileSync(s, d)
    }
  }
}

// Add component from GitHub
async function addComponent(componentName) {
  const destDir = path.resolve(cwd, 'src/components/ui', componentName)

  console.log(`Fetching ${componentName} from GitHub...`)

  try {
    const files = await getComponentFiles(componentName)

    if (files.length === 0) {
      console.error(`Error: Component not found: ${componentName}`)
      listComponents()
      process.exit(1)
    }

    fs.mkdirSync(destDir, { recursive: true })

    for (const file of files) {
      const destPath = path.join(destDir, file.name)
      await downloadFile(file, destPath)
      console.log(`  ✔ ${file.name}`)
    }

    console.log(`\n✔ ${componentName} added to src/components/ui/${componentName}`)
    console.log('\nNext steps:')
    console.log(`  1. Import: import { ${toPascalCase(componentName)} } from '@/components/ui/${componentName}'`)
    console.log('  2. Configure CSS variables (see docs)')
  } catch (error) {
    console.error(`Error: ${error.message}`)
    console.error('\nMake sure you have internet connection and the component exists.')
    process.exit(1)
  }
}

// List available components
async function listComponents() {
  console.log('Available components:')
  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${COMPONENTS_PATH}?ref=${GITHUB_BRANCH}`
    const data = await fetchJSON(url)
    const components = data.filter((item) => item.type === 'dir').map((item) => item.name)
    components.forEach((c) => console.log(`  - ${c}`))
  } catch (error) {
    console.error(`  (unable to fetch: ${error.message})`)
  }
}

// Copy styles from installed package
function copyStyles() {
  const stylesSrc = path.resolve(cwd, 'node_modules/artharexian-ui/src/styles')
  const stylesDst = path.resolve(cwd, 'src/styles')

  if (!fs.existsSync(stylesSrc)) {
    console.log('⚠ Styles not found in package')
    return
  }

  fs.mkdirSync(stylesDst, { recursive: true })

  for (const file of fs.readdirSync(stylesSrc)) {
    if (file.endsWith('.css')) {
      const srcFile = path.join(stylesSrc, file)
      const dstFile = path.join(stylesDst, file)
      fs.copyFileSync(srcFile, dstFile)
      console.log(`✔ ${file} installed to src/styles/${file}`)
    }
  }
}

// Helper functions
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function toPascalCase(str) {
  return str
    .split('-')
    .map((part) => capitalize(part))
    .join('')
}

// CLI commands
if (!command) {
  console.log('Usage: artharexian-ui <add|eject|init|list> [component]')
  console.log('')
  console.log('Commands:')
  console.log('  add <component>      Add a component to your project (from GitHub)')
  console.log('  eject <component>    Alias for add (eject component source)')
  console.log('  init                 Initialize library (copy styles)')
  console.log('  list                 List available components')
  console.log('')
  console.log('Examples:')
  console.log('  npx artharexian-ui add button-base')
  console.log('  npx artharexian-ui list')
  console.log('  npx artharexian-ui init')
  process.exit(0)
}

if (command === 'init') {
  console.log('Initializing artharexian-ui...')
  copyStyles()
  console.log('')
  console.log('✔ artharexian-ui initialized successfully!')
  process.exit(0)
}

if (command === 'list') {
  await listComponents()
  process.exit(0)
}

if (command === 'add' || command === 'eject') {
  if (!component) {
    console.error('Error: Component name required')
    console.error('Usage: artharexian-ui add <component>')
    process.exit(1)
  }
  await addComponent(component)
  process.exit(0)
}

console.error(`Unknown command: ${command}`)
console.error('Run without arguments for usage info')
process.exit(1)
