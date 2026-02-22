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
  // Функция для автоопределения структуры проекта
  const hasSrc = fs.existsSync(path.join(cwd, 'src')) // Проверяем, есть ли папка src
  return {
    components: hasSrc ? 'src/components/ui' : 'components/ui',
    styles: hasSrc ? 'src/styles' : 'styles',
  }
}

function copyDir(src, dest) {
  // Рекурсивная функция копирования папки
  fs.mkdirSync(dest, { recursive: true }) // Создаём папку назначения (если её нет)
  for (const file of fs.readdirSync(src)) {
    // Перебираем все файлы и папки в исходной директории
    const s = path.join(src, file) // Формируем полный путь к исходному файлу
    const d = path.join(dest, file) // Формируем полный путь к файлу назначения
    if (fs.statSync(s).isDirectory()) {
      // Если это папка
      copyDir(s, d) // Рекурсивно копируем её содержимое
    } else {
      // Если это файл
      if (!fs.existsSync(d)) {
        // Проверяем, не существует ли файл уже
        fs.copyFileSync(s, d) // Копируем файл
        console.log('add', path.relative(cwd, d)) // Выводим относительный путь добавленного файла
      }
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

  if (fs.existsSync(STYLES_DIR)) {
    copyDir(STYLES_DIR, path.join(cwd, config.styles)) // Копируем стили в проект пользователя
  }

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
    console.log('Initializing...\n') // Сообщаем, что запускается инициализация
    init() // Выполняем init автоматически
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8')) // Загружаем конфигурацию

  const src = path.join(COMPONENTS_DIR, name) // Путь к компоненту в пакете
  const dest = path.join(cwd, config.components, name) // Путь установки компонента в проекте

  fs.mkdirSync(dest, { recursive: true })
  for (const file of entry.files) {
    const s = path.join(src, file)
    const d = path.join(dest, file)
    if (fs.existsSync(s)) {
      fs.copyFileSync(s, d)
      console.log('add', path.relative(cwd, d))
    }
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
  npx rxn-ui add button
`)
}
