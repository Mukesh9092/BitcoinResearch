import fetch from "isomorphic-fetch";
import { Application } from "express";

import store from "../common/database/store";

const MILLISECOND_MULTIPLIER = 1000;
const INTERVAL = 5;
const INTERVAL_IN_SECONDS = INTERVAL * 60;
const INTERVAL_IN_MILLISECONDS = INTERVAL_IN_SECONDS * MILLISECOND_MULTIPLIER;

async function requestMarket(currencyPair: string, period: number, start: number, end: number) {
  const queryURL = [
    "https://poloniex.com/public?",
    "command=returnChartData",
    `&currencyPair=${currencyPair}`,
    `&start=${start}`,
    `&end=${end}`,
    `&period=${period}`
  ].join("");

  const apiResult = await fetch(queryURL);
  const apiResultJSON = await apiResult.json();

  return apiResultJSON;
}

async function requestData() {
  console.log("requestData");

  const currencies = await store.findAll("currency", {
    where: {
      delisted: false,
      disabled: false,
      frozen: false
    }
  });

  const currencyPairs = currencies
    // .toJSON()
    .filter((x: { key: string }) => x.key !== "BTC")
    .map((x: { key: string }) => `BTC_${x.key}`);

  const end = new Date().valueOf();
  // Use INTERVAL_IN_MILLISECONDS * 2 to get at least one interval back every time.
  const start = end - INTERVAL_IN_MILLISECONDS * 2;

  const results = await Promise.all(
    currencyPairs.map((currencyPair: string) =>
      requestMarket(currencyPair, INTERVAL_IN_SECONDS, start, end)
    )
  );

  console.log("requestData results", results);

  setTimeout(requestData, INTERVAL_IN_MILLISECONDS);
}

// requestData();

export default function poloniex(app: Application) {
  // Create a timeout system to scrape poloniex of data.
}
