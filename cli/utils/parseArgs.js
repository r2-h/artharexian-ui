export function parseArgs(args) {
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
