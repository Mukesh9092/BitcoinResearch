import gql from 'graphql-tag';
import { observable } from "mobx";

import Candlestick from "../common/types/Candlestick";

import apolloClient from "../graphql/client";

interface IChartProps {
  candlesticks: Candlestick[];
}

export class ChartStore {
  @observable candlesticks: Candlestick[];

  constructor(props: IChartProps | void) {
    // console.log("Chart#constructor", initialData);

    if (props) {
      this.candlesticks = props.candlesticks;
    }
  }

  async load(currencyA: string, currencyB: string, period: number, start: number, end: number) {
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

    const result = await apolloClient.query(query);

    this.candlesticks = result.data.candlesticks;
  }
}

export default new ChartStore(undefined);
