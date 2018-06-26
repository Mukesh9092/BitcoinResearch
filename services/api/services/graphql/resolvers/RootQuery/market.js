import { act } from '../../../../common/hemera/client'

export default async function market(obj, args) {
  try {
    const { key } = args

    const result = await act({
      topic: 'Markets',
      cmd: 'getMarket',
      key,
    })

    return result
  } catch (error) {
    throw error
  }
}
