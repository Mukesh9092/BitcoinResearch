import express from "express";

import authenticationHeaderExtraction from "./lib/middleware/authenticationHeaderExtraction";
import expressServiceWith from "./lib/middleware/expressServiceWith";
import genericExpressService from "./lib/middleware/genericExpressService";
import graphql from "./middleware/graphql";
import logger from "./lib/middleware/logger";
import poloniex from "./middleware/poloniex";

const { API_HOST, API_PORT } = process.env;

expressServiceWith(
  app => {
    genericExpressService(app);
    logger(app);
    authenticationHeaderExtraction(app);
    graphql(app);
    poloniex(app);
  },
  API_HOST,
  API_PORT
);
