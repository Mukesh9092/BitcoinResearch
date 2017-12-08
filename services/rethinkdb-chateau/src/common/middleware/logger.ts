import { Request, Response, Application } from "express";

import * as morgan from "morgan";

import isDevelopment from "../environment/isDevelopment";

function requestMatches(req: Request): boolean {
  if (isDevelopment()) {
    if (req.url.match(/^\/_next/)) {
      return true;
    }
  }

  return false;
}

morgan.format('combined', ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"')

function morganFormat(tokens, req: Request, res: Response): string {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ');
}

export default function logger(app: Application) {
  app.use(morgan(morganFormat, {
    skip: requestMatches
  }));
}
