import { Application } from "express";

import authenticationHeaderExtraction from "./common/middleware/authenticationHeaderExtraction";
import expressServiceWith from "./common/middleware/expressServiceWith";
import genericExpressService from "./common/middleware/genericExpressService";
import logger from "./common/middleware/logger";

import graphql from "./middleware/graphql";
import poloniex from "./middleware/poloniex";

const { API_HOST, API_PORT } = process.env;

function configureApplication(app: Application) {
  genericExpressService(app);
  logger(app);
  authenticationHeaderExtraction(app);
  graphql(app);
  poloniex(app);
}

expressServiceWith(configureApplication, String(API_HOST), Number(API_PORT));
