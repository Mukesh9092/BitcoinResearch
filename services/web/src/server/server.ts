import { Application } from 'express';
import unhandledError from 'unhandled-error';

import authenticationHeaderExtractionMiddleware from '../../common/middleware/authenticationHeaderExtraction';
import expressServiceWithMiddleware from '../../common/middleware/expressServiceWith';
import genericExpressService from '../../common/middleware/genericExpressService';
import loggerMiddleware from '../../common/middleware/logger';

const { WEB_HOST, WEB_PORT } = process.env;

function configureApplication(app: Application) {
  genericExpressService(app);
  loggerMiddleware(app);
  authenticationHeaderExtractionMiddleware(app);
}

expressServiceWithMiddleware(
  configureApplication,
  String(WEB_HOST),
  Number(WEB_PORT),
);

unhandledError(console.log);
