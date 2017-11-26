import { gql } from "react-apollo";
import { observable } from "mobx";

import apolloClient from "../graphql/client";

export class Chart {
  @observable candlesticks;

  constructor(initialData) {
    // console.log("Chart#constructor", initialData);

    if (initialData) {
      this.candlesticks = initialData.candlesticks;
    }
  }

  static getBrowserInstance(initialData) {
    console.log("Chart#getBrowserInstance", initialData);

    const instance = new Chart(initialData);

    return instance;
  }

  static getServerInstance(ctx) {
    const instance = new Chart();

    return instance;
  }

  async load(currencyA, currencyB, period, start, end) {
    // console.log("Chart#load", currencyA, currencyB, period, start, end);

    const query = {
      query: gql`
        query candlesticks(
          $currencyA: String!
          $currencyB: String!
          $period: Int!
          $start: Date!
          $end: Date!
        ) {
          candlesticks(
            currencyA: $currencyA
            currencyB: $currencyB
            period: $period
            start: $start
            end: $end
          ) {
            id
            high
            low
            open
            close
            volume
            quoteVolume
          }
        }
      `,
      variables: {
        currencyA,
        currencyB,
        period,
        start,
        end
      }
    };

    const { data: { candlesticks } } = await apolloClient.query(query);

    this.candlesticks = candlesticks;
  }
}

export const instance = new Chart();
