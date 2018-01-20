import * as moment from "moment";
import { Application } from "express";

import CandlestickRepository from "../common/database/repositories/CandlestickRepository";
import CurrencyPairRepository from "../common/database/repositories/CurrencyPairRepository";
import getDatabaseClient from "../common/database/client";

const IDLE_TIMEOUT = 1000 * 60 * 5;
const PERIODS = [ 300, 900, 1800, 7200, 14400, 86400 ];
const QUERY_CANDLE_AMOUNT = 100;

async function getCurrencyPairs() {
  console.log("getCurrencyPairs");

  const connection = await getDatabaseClient();
  const currencyPairRepository = connection.getCustomRepository(CurrencyPairRepository);

  const importResult = await currencyPairRepository.import();

  return importResult;
}

async function importCandlesticksForCurrencyPairs(currencyPairs, period, start, end) {
  console.log("data-synchronizer: CandlesticksForCurrencyPairs");

  const connection = await getDatabaseClient();
  const candlestickRepository = connection.getCustomRepository(CandlestickRepository);

  const allResults = await Promise.all(currencyPairs.map((currencyPair) => { 
    return candlestickRepository.import(currencyPair.key, period, start, end);
  }));

  let total = 0;

  for (let i in allResults) {
    for (let j in allResults[i]) {
      total += allResults[i][j];
    }
  }

  console.log(`data-synchronizer: Imported ${total} candlesticks.`)

  return allResults;
}

async function update() {
  console.log("data-synchronizer: Updating.");

  let currencyPairs = await getCurrencyPairs();

  currencyPairs = currencyPairs.slice(0, 10)

  for (let i in PERIODS) {
    const endMoment = moment().startOf("day");
    const end = endMoment.valueOf();
    const startMoment = endMoment.subtract(QUERY_CANDLE_AMOUNT, "day");
    const start = startMoment.valueOf();
    const period = PERIODS[i];

    await importCandlesticksForCurrencyPairs(currencyPairs, period, start, end);
  }

  idle();
}

function idle() {
  console.log("data-synchronizer: Idling for 5 minutes");

  setTimeout(update, IDLE_TIMEOUT);
}

export default function graphql(app: Application): void {
  console.log("data-syncrhronizer");

  update();
}
