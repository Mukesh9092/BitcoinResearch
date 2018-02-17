import gql from 'graphql-tag';
import { observable } from "mobx";

import ICandlestick from "../common/types/ICandlestick";

import apolloClient from "../graphql/client";

interface IChartProps {
  candlesticks: ICandlestick[];
  loading: boolean;
}

export class ChartStore {
  @observable candlesticks: ICandlestick[];
  @observable loading: boolean;

  constructor(props: IChartProps | void) {
    // console.log("Chart#constructor", initialData);

    if (props) {
      this.candlesticks = props.candlesticks;
      this.loading = false;
    }
  }

  async load(currencyAKey: string, currencyBKey: string, period: number, start: number, end: number) {
    // console.log("Chart#load", currencyAKey, currencyBKey, period, start, end);

    const query = {
      query: gql`
        query candlesticks(
          $currencyAKey: String!
          $currencyBKey: String!
          $period: Int!
          $start: Date!
          $end: Date!
        ) {
          candlesticks(
            currencyAKey: $currencyAKey
            currencyBKey: $currencyBKey
            period: $period
            start: $start
            end: $end
          ) {
            id
            time
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
        currencyAKey,
        currencyBKey,
        period,
        start,
        end
      }
    };

    this.loading = true;

    const result = await apolloClient.query(query);

    this.candlesticks = result.data.candlesticks;
    this.loading = false;
  }
}

export default new ChartStore(undefined);
