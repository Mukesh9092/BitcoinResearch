import express from 'express';

import { formatError } from '../errors';

export default function expressServiceWith(middleware, host, port) {
  const app = express();

  middleware(app);

  app.listen(port, host, error => {
    if (error) {
      console.log(formatError(error));
      return;
    }

    console.log(`HTTP Server listening at http://${host}:${port}.`);
  });
}
