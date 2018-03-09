import { ServerRequest, ServerResponse } from 'http';

import { capitalize as capitalizeString } from 'lodash';

function capitalize(req: ServerRequest, res: ServerResponse) {
  let body: Buffer[] = [];

  req
    .on('error', err => {
      console.error(err);
    })
    .on('data', (chunk: Buffer) => {
      body.push(chunk);
    })
    .on('end', () => {
      const result = Buffer.concat(body).toString();
      res.end(capitalizeString(result));
    });
}

export default {
  capitalize,
};
