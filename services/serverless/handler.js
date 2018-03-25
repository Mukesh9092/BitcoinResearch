import { capitalize as capitalizeString } from 'lodash';

function capitalize(req, res) {
  let body = [];

  req
    .on('error', err => {
      console.error(err);
    })
    .on('data', chunk => {
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
