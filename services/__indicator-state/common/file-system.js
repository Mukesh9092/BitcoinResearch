import fs from 'fs'
import { promisify } from 'util'

import { log } from './log'

export async function access(path, mode = fs.constants.F_OK) {
  // log.debug('access', path)

  return new Promise((yes, no) => {
    fs.access(path, (error) => {
      // log.debug('access error', error)

      if (error) {
        return yes(false)
      }

      return yes(true)
    })
  })
}

export const readFile = promisify(fs.readFile)
export const writeFile = promisify(fs.writeFile)
