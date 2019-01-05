import { inspect } from 'util'

function inspectVariable(x) {
  switch(typeof(x)) {
    case 'string':
      return x

    case 'object':
      return inspect(x, false, null)

    default:
      throw new Error('Unknown Type: ', typeof(x))
  }
}

export function debug(...xs) {
  console.log.apply(console, xs.map(inspectVariable))
}
