import { Request, Response, Application } from 'express';

import morgan from 'morgan';

import isDevelopment from '../environment/isDevelopment';

const requestMatches = (req: Request): boolean =>
  isDevelopment() && Boolean(req.url.match(/^\/_next/));

export default function logger(app: Application) {
  if (isDevelopment) {
    app.use(morgan('dev', { skip: requestMatches }));
  } else {
    app.use(morgan('common', { skip: requestMatches }));
  }
}
