import ICurrency from './ICurrency';

interface ICandlestick {
  id: Date;
  currencyA: ICurrency;
  currencyB: ICurrency;
  high: number;
  low: number;
  open: number;
  close: number;
  volume: number;
  quoteVolume: number;
  weightedAverage: number;
};

export default ICandlestick;