import ICurrency from './ICurrency'
import IOrderBookEntry from './IOrderBookEntry'

interface IOrderBook {
  currencyA: ICurrency;
  currencyB: ICurrency;
  asks: IOrderBookEntry[];
  bids: IOrderBookEntry[];
};

export default IOrderBook;
