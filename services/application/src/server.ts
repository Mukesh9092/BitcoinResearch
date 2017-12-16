import * as next from "next";
import { Application, Request, Response } from "express";
import { resolve } from "path";

import authenticationHeaderExtraction from "./common/middleware/authenticationHeaderExtraction";
import expressServiceWith from "./common/middleware/expressServiceWith";
import genericExpressService from "./common/middleware/genericExpressService";
import logger from "./common/middleware/logger";
import { formatError } from "./common/errors";
import { isDevelopment } from "./common/environment";

const { APPLICATION_HOST, APPLICATION_PORT } = process.env;

async function main() {
  try {
    const nextApp = next({
      dev: isDevelopment(),
      dir: resolve(__dirname)
    });

    const configureApplication = (app: Application) => {
      genericExpressService(app);
      logger(app);
      authenticationHeaderExtraction(app);

      const nextRequestHandler = nextApp.getRequestHandler();

      app.use((req: Request, res: Response) => {
        nextRequestHandler(req, res);
      })
    };

    await nextApp.prepare();

    expressServiceWith(configureApplication, String(APPLICATION_HOST), Number(APPLICATION_PORT));
  } catch (error) {
    console.log(`! ${formatError(error)}`);
  }
}

main();
