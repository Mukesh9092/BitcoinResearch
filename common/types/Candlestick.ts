import Currency from './Currency';

type Candlestick = {
  id: Date,
  currencyA: Currency,
  currencyB: Currency,
  high: number,
  low: number,
  open: number,
  close: number,
  volume: number,
  quoteVolume: number,
  weightedAverage: number,
};

export default Candlestick;