import { act } from '../../common/hemera/client'

export default async function markets(obj, args) {
  try {
    const result = await act({
      topic: 'Markets',
      cmd: 'getMarkets',
    })

    return result
  } catch (error) {
    throw error
  }
}
