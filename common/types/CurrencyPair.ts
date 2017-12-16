import Currency from './Currency';
import CurrencyPairVolume from './CurrencyPairVolume';

type CurrencyPair = {
  id: string,
  key: string,
  currencyA: Currency,
  currencyB: Currency,
  volume24h: CurrencyPairVolume,
};

export default CurrencyPair;