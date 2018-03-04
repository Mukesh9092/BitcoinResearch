export interface UnsanitizedPoloniexVolumes {
  [key: string]: {
    [key: string]: any;
  };
}

export interface UnsanitizedPoloniexCurrencies {
  [key: string]: {
    name: string;
    txFee: string;
    minConf: string;
  };
}

export interface SanitizedPoloniexCurrencyPair {
  key: string;

  currencyAKey: string;
  currencyAName: string;
  currencyATxFee: string;
  currencyAMinConf: string;

  currencyBKey: string;
  currencyBName: string;
  currencyBTxFee: string;
  currencyBMinConf: string;

  currencyA24HVolume: string;
  currencyB24HVolume: string;
}
