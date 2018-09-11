import { inspect } from 'util'

const { LOG_LEVEL = 'info' } = process.env

let level = LOG_LEVEL

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
}

function logOutput(line) {
  const input = line
  // const outputter = (process && process.stdout && process.stdout.write) || console.log
  const outputter = console.log

  outputter(input)
}

function logError(error) {
  const input = error.stack || error.message || error
  // const outputter = (process && process.stdout && process.stdout.write) || console.log
  const outputter = console.log

  outputter(input)
}

function errorLogger(error) {
  try {
    logOutput(
      JSON.stringify({
        timestamp: new Date(),
        level,
        error: error.stack || error.message || error,
      }),
    )
  } catch (error) {
    logError(error)
  }
}

function defaultLogger(...args) {
  try {
    const message = JSON.stringify({
      timestamp: new Date(),
      level,
      data: args.length > 1 ? args : args[0],
    })
    logOutput(message)
  } catch (error) {
    errorLogger(error)
  }
}

function debugLogger(...args) {
  try {
    process.stdout.write(
      `${inspect(
        {
          timestamp: new Date(),
          level,
          data: args.length > 1 ? args : args[0],
        },
        null,
        {
          depth: Infinity,
          maxArrayLength: Infinity,
          colors: true,
        },
      )}\n`,
    )
  } catch (error) {
    errorLogger(error)
  }
}

function createLogger(name, fn = defaultLogger) {
  return (...args) => {
    // console.log('CREATELOGGER', level, levels[level], name, levels[name])
    if (levels[name] <= levels[level]) {
      fn(...args)
    }
  }
}

function logCurrentLevel() {
  return defaultLogger(`Logging at level: ${level}`)
}

function setLevel(newLevel) {
  level = newLevel
  logCurrentLevel()
}

export const log = {
  error: createLogger('error', errorLogger),
  warn: createLogger('warn', defaultLogger),
  info: createLogger('info', defaultLogger),
  debug: createLogger('debug', defaultLogger),
  setLevel,
}

// logCurrentLevel()
