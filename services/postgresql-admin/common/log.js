const { LOG_LEVEL = 'info' } = process.env

let level = LOG_LEVEL

const levels = {
  silent: -1,
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
}

const defaultLogger = message => {
  try {
    console.log(
      JSON.stringify({
        timestamp: new Date(),
        data: message,
      }),
    )
  } catch (error) {
    log.error(error)
  }
}

const create = (name, fn = defaultLogger) => {
  return message => {
    if (levels[level] >= levels[name]) {
      fn(message)
    }
  }
}

const logCurrentLevel = () => log[level](`Logging at level: ${level}`)

export const log = {
  error: create('error', error =>
    console.error(error.stack || error.message || error),
  ),
  warn: create('warn'),
  debug: create('debug'),
  info: create('info'),
  setLevel: newLevel => {
    level = newLevel
    logCurrentLevel()
  },
}

logCurrentLevel()
