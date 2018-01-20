import ICurrency from './ICurrency';
import ICurrencyPairVolume from './ICurrencyPairVolume';

interface ICurrencyPair {
  id: string;
  key: string;
  currencyA: ICurrency;
  currencyB: ICurrency;
  volume24h: ICurrencyPairVolume;
};

export default ICurrencyPair;