import currencyPairs from '../../../api/src/graphql/resolvers/RootQuery/currencyPairs';
import gql from 'graphql-tag';
import { observable } from "mobx";

import apolloClient from "../graphql/client";

export interface ICurrencyPair {
  id: string;
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

export interface ICurrencyPairsStoreProps {
  list: ICurrencyPair[];
}

export class CurrencyPairsStore {
  @observable list: ICurrencyPair[] = [];

  constructor(props: ICurrencyPairsStoreProps | void) {
    // console.log("CurrencyPairsStore#constructor", props);

    if (props) {
      this.list = props.list;
    }
  }

  async load() {
    // console.log("CurrencyPairsStore#load");

    try {
      const query = {
        query: gql`
          query currencyPairs {
            currencyPairs {
              id
              key
              currencyAKey
              currencyAName
              currencyATxFee
              currencyAMinConf
              currencyBKey
              currencyBName
              currencyBTxFee
              currencyBMinConf
              currencyA24HVolume
              currencyB24HVolume
            }
          }
        `
      };

      const result = await apolloClient.query(query);

      // console.log("CurrencyPairsStore#load result", result);

      this.list = result.data.currencyPairs;
    } catch (error) {
      throw error;
    }
  }
}

export default new CurrencyPairsStore(undefined);
