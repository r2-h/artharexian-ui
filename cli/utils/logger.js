// ANSI color codes
export const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  bold: '\x1b[1m',
}

export function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`)
}

log.error = (message) => console.error(`${colors.red}✖ ${message}${colors.reset}`)
log.info = (message) => console.info(`${colors.blue}ℹ ${message}${colors.reset}`)
log.success = (message) => log(`✔ ${message}`, colors.green)
log.bold = (message) => console.log(`${colors.bold}${message}${colors.reset}`)
