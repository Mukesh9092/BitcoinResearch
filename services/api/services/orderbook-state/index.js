import Hemera from 'nats-hemera';
import Nats from 'nats';

import { importCurrencyPairs } from '../../common/database/repositories/currency-pair';
import { readEvents } from '../../common/eventstore/client';

const { NATS_HOST, NATS_PORT } = process.env;

const nats = Nats.connect({
  servers: [`nats://${NATS_HOST}:${NATS_PORT}`],
});

const hemera = new Hemera(nats, {
  logLevel: 'info',
});

function sum(msg, cb) {
  cb(null, { answer: msg.a + msg.b });
}

function product(msg, cb) {
  cb(null, { answer: msg.left * msg.right });
}

async function start() {
  try {
    await hemera.ready();

    hemera.add(
      {
        topic: 'math',
        cmd: 'sum',
      },
      sum,
    );
    hemera.add(
      {
        topic: 'math',
        cmd: 'product',
      },
      product,
    );
    hemera.act(
      {
        topic: 'math',
        cmd: 'sum',
        a: 1,
        b: 3,
      },
      function(error, response) {
        if (error) {
          console.error(error);
          return;
        }
        console.log('RESPONSE', response);
      },
    );
  } catch (error) {
    console.error(error);
  }
}

start();
