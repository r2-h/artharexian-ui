#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url) // Получаем абсолютный путь к текущему файлу (аналог __filename)
const __dirname = path.dirname(__filename) // Получаем директорию текущего файла (аналог __dirname)

const COMPONENTS_DIR = path.join(__dirname, '..', 'src', 'components') // Путь к компонентам внутри пакета
const STYLES_DIR = path.join(__dirname, '..', 'src', 'styles') // Путь к стилям внутри пакета
const REGISTRY_JSON = path.join(__dirname, 'registry.json') // Путь к файлу registry.json

const cwd = process.env.INIT_CWD || process.cwd() // Текущая директория, где пользователь запустил CLI

function readRegistry() {
  if (!fs.existsSync(REGISTRY_JSON)) {
    // Проверяем, существует ли registry.json
    console.error('Registry not found')
    process.exit(1)
  }
  return JSON.parse(fs.readFileSync(REGISTRY_JSON, 'utf8'))
}

function detectProject() {
  const hasSrc = fs.existsSync(path.join(cwd, 'src'))
  return {
    components: hasSrc ? 'src/shared/components' : 'components',
    styles: hasSrc ? 'src/app/styles' : 'styles',
  }
}

function hasStyles(stylesPath) {
  // Проверяет, есть ли уже файлы стилей в проекте
  if (!fs.existsSync(stylesPath)) return false
  return fs.readdirSync(stylesPath).some(f => f.endsWith('.css'))
}

function copyFiles(srcDir, destDir, files) {
  // Копирует указанные файлы из srcDir в destDir (только отсутствующие)
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of files) {
    const s = path.join(srcDir, file)
    const d = path.join(destDir, file)
    if (fs.existsSync(s) && !fs.existsSync(d)) {
      fs.copyFileSync(s, d)
      console.log('add', path.relative(cwd, d))
    }
  }
}

function init() {
  const configPath = path.join(cwd, 'rxn-ui.json') // Путь к конфигурационному файлу
  if (fs.existsSync(configPath)) {
    console.log('✔ already initialized')
    return
  }
  const config = detectProject()
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2)) // Сохраняем конфиг в файл
  console.log('✔ rxn-ui initialized')
}

function add(name) {
  const registry = readRegistry() // Читаем registry.json
  const entry = registry[name] // Получаем запись компонента по имени

  if (!entry) {
    // Если компонент не найден
    console.error('Component not found:', name)
    process.exit(1)
  }

  const configPath = path.join(cwd, 'rxn-ui.json') // Путь к конфигу
  if (!fs.existsSync(configPath)) {
    console.log('You should initialize...\n npx rxn-ui init')
    process.exit(1)
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))

  // Копируем компонент
  const src = path.join(COMPONENTS_DIR, name)
  const dest = path.join(cwd, config.components, name)
  copyFiles(src, dest, entry.files)

  // Копируем стили, если их нет
  const stylesDest = path.join(cwd, config.styles)
  if (!hasStyles(stylesDest)) {
    copyFiles(STYLES_DIR, stylesDest, fs.readdirSync(STYLES_DIR))
  }

  console.log(`\n✔ ${name} added`)
}

const [cmd, arg] = process.argv.slice(2) // Получаем аргументы командной строки

if (cmd === 'init') init()
else if (cmd === 'add') add(arg)
else {
  console.log(` 
rxn-ui

Usage:
  npx rxn-ui init
  npx rxn-ui add button-base
`)
}
