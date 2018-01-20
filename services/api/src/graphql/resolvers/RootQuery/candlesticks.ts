import CurrencyPairRepository from "../../../common/database/repositories/CurrencyPairRepository";
import getDatabaseClient from "../../../common/database/client";
import getPoloniexClient from "../../../common/poloniex/client";
import getInfluxDBClient from "../../../common/influxdb/client";
import ensureTable from "../../../common/database/helpers/ensureTable";
import {
  findByCurrencyPairAndPeriodBetweenStartAndEnd,
  importForCurrencyPairAndPeriodBetweenStartAndEnd,
} from "../../../common/influxdb/entities/candlestick";

import fetchPoloniex from "../fetchPoloniex";

const MILLISECOND_MULTIPLIER = 1000;

interface ICandlesticksOptions {
  currencyAKey: string;
  currencyBKey: string;
  period: number;
  start: number;
  end: number;
}

const convertToGraphQLFormat = (data: any) => {
  return data.map((x: any) => {
    x.id = x.time;

    return x;
  });
};

export default async function candlesticks(root, { currencyAKey, currencyBKey, period, start, end }: ICandlesticksOptions) {
  console.log('graphql resolvers RootQuery candlesticks', currencyAKey, currencyBKey, period, start, end);

  const currencyPairKey = `${currencyAKey}_${currencyBKey}`;

  const influxDBClient = await getInfluxDBClient();

  let candlesticksFindResult = await findByCurrencyPairAndPeriodBetweenStartAndEnd(
    currencyAKey,
    currencyBKey,
    period,
    start * 1000 * 1000,
    end * 1000 * 1000,
  )

  if (candlesticksFindResult && candlesticksFindResult.length) {
    const output = convertToGraphQLFormat(candlesticksFindResult)

    return output;
  }

  const importResult = await importForCurrencyPairAndPeriodBetweenStartAndEnd(
    currencyAKey,
    currencyBKey,
    period,
    start * 1000 * 1000,
    end * 1000 * 1000,
  );

  candlesticksFindResult = await findByCurrencyPairAndPeriodBetweenStartAndEnd(
    currencyAKey,
    currencyBKey,
    period,
    start * 1000 * 1000,
    end * 1000 * 1000,
  );

  const output = convertToGraphQLFormat(candlesticksFindResult)

  return output;
};
