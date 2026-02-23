#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import { detectProject, loadConfig, saveConfig } from './utils/config.js'
import { fetchFile, fetchJSON } from './utils/fetch.js'
import { colors, error, info, log, success } from './utils/logger.js'

const GITHUB_REPO = 'r2-h/artharexian-ui'
const GITHUB_RAW = `https://raw.githubusercontent.com/${GITHUB_REPO}/main`

const cwd = process.env.INIT_CWD || process.cwd()

const STYLES_FILES = ['style.css', 'variables.css']

function getRegistryUrl(tag) {
  return tag ? `${GITHUB_RAW}/cli/registry.json?ref=${tag}` : `${GITHUB_RAW}/cli/registry.json`
}

function getComponentFileUrl(component, file, tag) {
  if (tag) {
    return `${GITHUB_RAW}/src/components/${component}/${file}?ref=${tag}`
  }
  return `${GITHUB_RAW}/src/components/${component}/${file}`
}

function getStyleFileUrl(file, tag) {
  if (tag) {
    return `${GITHUB_RAW}/src/styles/${file}?ref=${tag}`
  }
  return `${GITHUB_RAW}/src/styles/${file}`
}

async function init(cmdOptions = {}) {
  const configPath = path.join(cwd, 'rxn-ui.json')

  if (fs.existsSync(configPath) && !cmdOptions.overwrite) {
    const existing = loadConfig()
    info(`Already initialized at ${configPath}`)
    info(`Components: ${existing.components}`)
    info(`Styles: ${existing.styles}`)
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

  saveConfig(config)
  success('rxn-ui initialized')
  log(`\nConfiguration saved to ${configPath}`)
  log(`  Components: ${config.components}`)
  log(`  Styles: ${config.styles}`)
  log(`\nNow you can add components:`)
  log(`  npx rxn-ui add button-base`)
}

async function add(name, cmdOptions = {}) {
  const config = loadConfig()
  if (!config) {
    error('Not initialized. Run: npx rxn-ui init')
    process.exit(1)
  }

  const tag = cmdOptions.tag || null
  const registryUrl = getRegistryUrl(tag)

  let registry
  try {
    registry = await fetchJSON(registryUrl)
  } catch (err) {
    error(`Failed to fetch registry: ${err.message}`)
    process.exit(1)
  }

  const entry = registry[name]
  if (!entry) {
    error(`Component "${name}" not found`)
    info(`Available components: ${Object.keys(registry).join(', ')}`)
    process.exit(1)
  }

  const componentsDir = path.join(cwd, config.components)
  const stylesDir = path.join(cwd, config.styles)

  fs.mkdirSync(componentsDir, { recursive: true })
  fs.mkdirSync(stylesDir, { recursive: true })

  log(`\n${colors.bold}Adding ${name}...${colors.reset}`)

  for (const file of entry.files) {
    const url = getComponentFileUrl(name, file, tag)
    const destDir = path.join(componentsDir, name)
    const destPath = path.join(destDir, file)

    try {
      const content = await fetchFile(url)
      fs.mkdirSync(destDir, { recursive: true })
      fs.writeFileSync(destPath, content)
      success(`Added ${path.relative(cwd, destPath)}`)
    } catch (err) {
      error(`Failed to download ${file}: ${err.message}`)
    }
  }

  await downloadStyles(stylesDir, tag)
  showDependencies(entry)

  if (entry.imports) {
    log(`\n${colors.bold}Usage:${colors.reset}`)
    for (const imp of entry.imports) {
      log(`  ${imp}`)
    }
  }
}

async function downloadStyles(stylesDir, tag) {
  const existingStyles = fs.existsSync(stylesDir)
    ? fs.readdirSync(stylesDir).filter((f) => f.endsWith('.css'))
    : []

  const stylesToDownload = STYLES_FILES.filter((s) => !existingStyles.includes(s))

  if (stylesToDownload.length === 0) {
    info('Styles already exist, skipping...')
    return
  }

  log(`\n${colors.bold}Adding styles...${colors.reset}`)
  for (const styleFile of stylesToDownload) {
    const url = getStyleFileUrl(styleFile, tag)
    const destPath = path.join(stylesDir, styleFile)

    try {
      const content = await fetchFile(url)
      fs.mkdirSync(stylesDir, { recursive: true })
      fs.writeFileSync(destPath, content)
      success(`Added ${path.relative(cwd, destPath)}`)
    } catch (err) {
      error(`Failed to download ${styleFile}: ${err.message}`)
    }
  }
}

function showDependencies(entry) {
  if (!entry.dependencies || entry.dependencies.length === 0) {
    return
  }

  log(`\n${colors.bold}Installing dependencies...${colors.reset}`)
  info(`Packages: ${entry.dependencies.join(', ')}`)

  const isPnpm = fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))
  const isYarn = fs.existsSync(path.join(cwd, 'yarn.lock'))
  const isBun =
    fs.existsSync(path.join(cwd, 'bun.lock')) || fs.existsSync(path.join(cwd, 'bun.lockb'))

  let installCmd = 'npm install'
  if (isPnpm) installCmd = 'pnpm add'
  else if (isYarn) installCmd = 'yarn add'
  else if (isBun) installCmd = 'bun add'

  log(`\nRun this command to install dependencies:`)
  log(`  ${installCmd} ${entry.dependencies.join(' ')}`)
}

async function list(cmdOptions = {}) {
  const tag = cmdOptions.tag || null
  const registryUrl = getRegistryUrl(tag)

  let registry
  try {
    registry = await fetchJSON(registryUrl)
  } catch (err) {
    error(`Failed to fetch registry: ${err.message}`)
    process.exit(1)
  }

  log(`\n${colors.bold}Available components:${colors.reset}\n`)

  const names = Object.keys(registry).sort()
  const maxLen = Math.max(...names.map((n) => n.length))

  for (const name of names) {
    const entry = registry[name]
    const desc = entry.description || ''
    const padded = name.padEnd(maxLen)
    log(`  ${colors.blue}${padded}${colors.reset}  ${desc}`)
  }

  log(`\nTo add a component: npx rxn-ui add <name>`)
}

function showHelp() {
  log(`
${colors.bold}rxn-ui${colors.reset} - Vue 3 UI components

${colors.bold}Usage:${colors.reset}
  npx rxn-ui <command> [options]

${colors.bold}Commands:${colors.reset}
  init              Initialize rxn-ui in your project
  add <component>   Add a component to your project
  list              List available components
  help              Show this help message

${colors.bold}Options:${colors.reset}
  --tag <version>   Use a specific version from GitHub
  --overwrite       Overwrite existing config (for init)
  --components <path>  Custom components directory
  --styles <path>   Custom styles directory

${colors.bold}Examples:${colors.reset}
  npx rxn-ui init
  npx rxn-ui add button-base
  npx rxn-ui add card-base --tag v0.4.6
  npx rxn-ui list
`)
}

function parseArgs(args) {
  const cmd = args[0]
  const options = {}
  const positional = []

  for (let i = 1; i < args.length; i++) {
    const arg = args[i]
    if (arg.startsWith('--')) {
      const key = arg.slice(2)
      const value = args[i + 1]
      if (value && !value.startsWith('--')) {
        options[key] = value
        i++
      } else {
        options[key] = true
      }
    } else {
      positional.push(arg)
    }
  }

  return { cmd, options, positional }
}

async function main() {
  const args = process.argv.slice(2)
  const { cmd, options, positional } = parseArgs(args)

  switch (cmd) {
    case 'init':
      await init(options)
      break
    case 'add':
      if (!positional[0]) {
        error('Please specify a component name')
        log('Usage: npx rxn-ui add <component>')
        process.exit(1)
      }
      await add(positional[0], options)
      break
    case 'list':
      await list(options)
      break
    case 'help':
    case '--help':
    case '-h':
      showHelp()
      break
    default:
      if (!cmd) {
        showHelp()
      } else {
        error(`Unknown command: ${cmd}`)
        log('Run "npx rxn-ui help" for usage')
        process.exit(1)
      }
  }
}

main().catch((err) => {
  error(err.message)
  process.exit(1)
})
