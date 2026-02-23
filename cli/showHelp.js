import { colors, log } from './utils/logger.js'

export function showHelp() {
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
  --tag <version>      Use a specific version from GitHub
  --overwrite          Overwrite existing config (for init)
  --components <path>  Custom components directory
  --styles <path>      Custom styles directory
  --composables <path> Custom composables directory

${colors.bold}Examples:${colors.reset}
  npx rxn-ui init
  npx rxn-ui add button-base
  npx rxn-ui add card-base --tag v0.4.6
  npx rxn-ui list
`)
}
