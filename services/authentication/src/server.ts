import { Application } from 'express';
import { authenticate } from 'passport';

import expressServiceWith from './common/middleware/expressServiceWith';
import genericExpressService from './common/middleware/genericExpressService';
import logger from './common/middleware/logger';
import passport from './common/middleware/passport';
import sessions from './common/middleware/sessions';
import { localAuthentication, logout } from './routes';

const { AUTHENTICATION_HOST, AUTHENTICATION_PORT } = process.env;

function configureApplication(app: Application) {
  genericExpressService(app);
  logger(app);
  sessions(app);
  passport(app);

  app.post("/api/authentication/local", authenticate("local"), localAuthentication);
  app.get("/api/authentication/logout", logout);
}

expressServiceWith(configureApplication, AUTHENTICATION_HOST, Number(AUTHENTICATION_PORT));
