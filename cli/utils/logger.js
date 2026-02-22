// ANSI color codes
export const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
}

export function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`)
}

export function error(message) {
  console.error(`${colors.red}✖ ${message}${colors.reset}`)
}

export function success(message) {
  log(`✔ ${message}`, colors.green)
}

export function info(message) {
  log(`ℹ ${message}`, colors.blue)
}
