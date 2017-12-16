import Currency from './Currency'
import OrderBookEntry from './OrderBookEntry'

type OrderBook = {
  currencyA: Currency
  currencyB: Currency
  asks: OrderBookEntry[]
  bids: OrderBookEntry[]
};

export default OrderBook;
