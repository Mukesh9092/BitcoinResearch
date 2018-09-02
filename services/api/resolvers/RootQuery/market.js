import { getMarket } from '../../common/database/repositories/market'

export default async function market(obj, args) {
  return getMarket(args)
}
