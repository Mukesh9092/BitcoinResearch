import * as autobahn from 'autobahn';
import { Application } from 'express';

const connection = new autobahn.Connection({
  url: 'wss://api.poloniex.com',
  realm: 'realm1'
});

connection.onopen = function (session) {
  // console.log("onopen");

  function marketEvent(args: any, kwargs: any) {
    // console.log(args);
  }

  function tickerEvent(args: any, kwargs: any) {
    // console.log(args);
  }

  function trollboxEvent(args: any, kwargs: any) {
    // console.log(args);
  }

  session.subscribe('BTC_ETH', marketEvent);
  session.subscribe('ticker', tickerEvent);
  session.subscribe('trollbox', trollboxEvent);
};

connection.onclose = function () {
  // console.log("Websocket connection closed");

  return true;
};

// console.log("Connecting to Poloniex API ...");
// connection.open();
                       
export default function poloniex(app: Application) {
}

/*

import * as autobahn from "autobahn";
import { Application } from "express";

import store from "../common/database/store";

const r = store.getAdapter("rethinkdb").r;

async function handleOpen(session: Object) {
  try {
    console.log("handleOpen");

    const currencyPairs = await r
      .table('currencyPairs')
      .filter(
        r.and(
          r.row('currencyA')('key').eq('BTC'),
          r.row('volume24h')('currencyAVolume').coerceTo('number').gt(1000),
        )
      );

    console.log('handleOpen currencyPairs', currencyPairs);

    if (currencyPairs && currencyPairs.length) {
      currencyPairs.forEach((element: { key: string }) => {
        console.log("handleOpen subscribing to", element.key);
        session.subscribe(element.key, handleMarketEvent);
      });
    }

    // console.log("handleOpen currencyPairs", currencyPairs);

    // session.subscribe('BTC_XMR', handleMarketEvent);

    console.log("handleOpen subscribing to ticker");
    session.subscribe('ticker', handleTickerEvent);

    // session.subscribe('trollbox', handleTrollboxEvent);
  } catch (error) {
    throw error;
  }
}

function handleClose() {
  console.log("handleClose");

  return true;
}

function handleMarketEvent(args: string[], kwargs: string[]) {
  console.log("handleMarketEvent")
  console.log("handleMarketEvent args", args)
  console.log("handleMarketEvent kwargs", kwargs)

  // console.log(args);
}

function handleTickerEvent(args: string[], kwargs: string[]) {
  console.log("handleTickerEvent")
  console.log("handleTickerEvent args", args)
  console.log("handleTickerEvent kwargs", kwargs)

  // console.log(args);
}

function handleTrollboxEvent(args: string[], kwargs: string[]) {
  // console.log(args);
}

export default function poloniex(app: Application) {
  const connection = new autobahn.Connection({
    url: "wss://api.poloniex.com",
    realm: "realm1"
  });

  connection.onopen = handleOpen;
  connection.onclose = handleClose;

  console.log("Connecting to Poloniex API ...");

  connection.open();
}
*/

/*
// import fetch from "isomorphic-fetch";
// const { POLONIEX_API_KEY, POLONIEX_API_SECRET } = process.env;
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
  try {
    console.log("requestData");

    const currencies = await store.findAll("currency", {
      where: {
        delisted: false,
        disabled: false,
        frozen: false
      }
    });

    console.log("requestData currencies", currencies);

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
  } catch (error) {
    throw error;
  }
}

// requestData();
*/
