import { act } from '../../../../common/hemera/client'
// import { log } from '../../../../common/log'

export default async function getOHLC(obj, args) {
  try {
    const { marketKey, size, from, to } = args

    const result = await act({
      topic: 'OHLC',
      cmd: 'getOHLC',
      marketKey,
      size,
      from,
      to,
    })

    return result
  } catch (error) {
    throw error
  }
}
