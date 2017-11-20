import { gql } from "react-apollo";
import { observable } from "mobx";

import apolloClient from "../graphql/client";

export class CurrencyPairs {
  @observable list;

  constructor(initialData) {
    // console.log("CurrencyPairs#constructor", initialData);

    if (initialData) {
      this.list = initialData.list;
    }
  }

  async load(req) {
    // console.log("CurrencyPairs#load");

    const query = {
      query: gql`
        query {
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

    const { data: { currencyPairs } } = await apolloClient.query(query);

    this.list = currencyPairs;
  }
}
