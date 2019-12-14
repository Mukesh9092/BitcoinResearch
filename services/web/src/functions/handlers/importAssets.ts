import ccxt from 'ccxt'
import { Asset } from '../../app/domain/Asset'
import firebase from '../common/firebase'

const importAssets = async () => {
  try {
    const trader = new ccxt.binance()
    const traderMarkets = await trader.loadMarkets()
    const markets = Object.values(traderMarkets)

    await Promise.all(
      markets.map(async (market) => {
        const marketDocument: Asset = {
          base: market.base,
          baseId: market.baseId,
          id: market.id,
          maker: market.maker,
          percentage: market.percentage,
          precision_amount: market.precision.amount,
          precision_base: market.precision.base,
          precision_price: market.precision.price,
          precision_quote: market.precision.quote,
          quote: market.quote,
          quoteId: market.quoteId,
          symbol: market.symbol,
          taker: market.taker,
          tierBased: market.tierBased,
          active: market.active,
        }

        await firebase
          .firestore()
          .collection('Asset')
          .doc(marketDocument.id)
          .set(marketDocument)
      }),
    )
  } catch (error) {
    console.error(error)
  }
}

export default importAssets
