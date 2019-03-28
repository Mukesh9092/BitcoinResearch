import { inspect } from 'util'

const INSPECT_INHERITED = false
const INSPECT_DEPTH = 10

function inspectVariable(x) {
  switch (typeof x) {
    case 'string':
      return x

    default:
      return inspect(x, INSPECT_INHERITED, INSPECT_DEPTH)
  }
}

export function debug(...xs) {
  console.log(...xs.map(inspectVariable))
}
