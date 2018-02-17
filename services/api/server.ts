import { Application } from 'express';
import unhandledError from 'unhandled-error';

import authenticationHeaderExtractionMiddleware from './common/middleware/authenticationHeaderExtraction';
import dataSynchronizerMiddleware from './middleware/data-synchronizer';
import expressServiceWithMiddleware from './common/middleware/expressServiceWith';
import genericExpressService from './common/middleware/genericExpressService';
import graphqlMiddleware from './middleware/graphql';
import loggerMiddleware from './common/middleware/logger';

const { API_HOST, API_PORT } = process.env;

function configureApplication(app: Application) {
  genericExpressService(app);
  loggerMiddleware(app);
  authenticationHeaderExtractionMiddleware(app);
  graphqlMiddleware(app);
  dataSynchronizerMiddleware(app);
}

expressServiceWithMiddleware(
  configureApplication,
  String(API_HOST),
  Number(API_PORT),
);

unhandledError(console.log);
