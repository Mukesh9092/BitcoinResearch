import currencyPairs from '../../../api/src/graphql/resolvers/RootQuery/currencyPairs';
import gql from 'graphql-tag';
import { observable } from "mobx";

import apolloClient from "../graphql/client";

export interface ICurrency {
  key: string;
  name: string;
  txFee: string;
  minConf: string;
}

export interface IVolume {
  currencyAVolume: string;
  currencyBVolume: string;
}

export interface ICurrencyPair {
  id: string;
  key: string;
  currencyA: ICurrency;
  currencyB: ICurrency;
  volume24h: IVolume;
}

export interface ICurrencyPairsStoreProps {
  list: ICurrencyPair[];
}

export class CurrencyPairsStore {
  @observable list: ICurrencyPair[] = [];

  constructor(props: ICurrencyPairsStoreProps | void) {
    console.log("CurrencyPairsStore#constructor", props);

    if (props) {
      this.list = props.list;
    }
  }

  async load() {
    console.log("CurrencyPairsStore#load");

    try {
      const query = {
        query: gql`
          query currencyPairs {
            currencyPairs {
              id
              key
              currencyA {
                key
                name
                txFee
                minConf
              }
              currencyB {
                key
                name
                txFee
                minConf
              }
              volume24h {
                currencyAVolume
                currencyBVolume
              }
            }
          }
        `
      };

      const result = await apolloClient.query(query);

      this.list = result.data.currencyPairs;
    } catch (error) {
      throw error;
    }
  }
}

export default new CurrencyPairsStore(undefined);
