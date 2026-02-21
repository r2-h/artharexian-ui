#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SRC_COMPONENTS = path.join(__dirname, '..', 'src', 'components')
const REGISTRY = path.join(__dirname, '..', 'registry')

const EXCLUDE_FILES = ['meta.json', 'index.stories.ts']
const EXCLUDE_DIRS = ['ui']

// Clean registry (keep registry.json and styles)
for (const file of fs.readdirSync(REGISTRY)) {
  const filePath = path.join(REGISTRY, file)
  if (fs.statSync(filePath).isDirectory() && file !== 'styles') {
    fs.rmSync(filePath, { recursive: true })
  }
}

// Build registry
const registry = {}

for (const component of fs.readdirSync(SRC_COMPONENTS)) {
  const srcPath = path.join(SRC_COMPONENTS, component)
  
  if (!fs.statSync(srcPath).isDirectory()) continue
  if (EXCLUDE_DIRS.includes(component)) continue
  
  const regComponentPath = path.join(REGISTRY, component)
  fs.mkdirSync(regComponentPath, { recursive: true })
  
  const files = []
  
  for (const file of fs.readdirSync(srcPath)) {
    if (EXCLUDE_FILES.includes(file)) continue
    if (!file.endsWith('.vue') && !file.endsWith('.ts')) continue
    
    fs.copyFileSync(path.join(srcPath, file), path.join(regComponentPath, file))
    files.push(file)
  }
  
  if (files.length > 0) {
    registry[component] = { files }
    console.log(`✔ ${component}: ${files.join(', ')}`)
  }
}

// Write registry.json
fs.writeFileSync(
  path.join(REGISTRY, 'registry.json'),
  JSON.stringify(registry, null, 2) + '\n'
)
console.log('\n✔ registry.json updated')
