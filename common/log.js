let level = 'info'

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

export const log = {
  error: create('error', error =>
    console.error(error.stack || error.message || error),
  ),
  warn: create('warn'),
  debug: create('debug'),
  info: create('info'),
  setLevel: newLevel => {
    level = newLevel
    log[level](`Logging at level: ${level}`)
  },
}
