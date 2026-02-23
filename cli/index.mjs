#!/usr/bin/env node

import process from 'node:process'

import { add } from './add.js'
import { init } from './init.js'
import { list } from './list.js'
import { showHelp } from './showHelp.js'
import { log } from './utils/logger.js'
import { parseArgs } from './utils/parseArgs.js'

async function main() {
  const args = process.argv.slice(2)
  const { cmd, options, positional } = parseArgs(args)

  switch (cmd) {
    case 'init':
      await init(options)
      break
    case 'add':
      if (!positional[0]) {
        log.error('Please specify a component name')
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
        log.error(`Unknown command: ${cmd}`)
        log('Run "npx rxn-ui help" for usage')
        process.exit(1)
      }
  }
}

main().catch((err) => {
  log.error(err.message)
  process.exit(1)
})
