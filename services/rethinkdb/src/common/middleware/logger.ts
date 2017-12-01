import { Request, Application } from "express";

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

export default function logger(app: Application) {
  app.use(morgan("combined", {
    skip: requestMatches
  }));
}
