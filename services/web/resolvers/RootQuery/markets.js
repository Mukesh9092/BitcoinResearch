import { getMarkets } from '../../common/database/repositories/market'

export default async function markets() {
  return getMarkets()
}
