import * as moment from 'moment';
import { Application } from 'express';

import { importCurrencyPairs } from '../common/database/repositories/currency-pair';
import { getKnexClient } from '../common/database/knex-client';

const IDLE_TIMEOUT = 1000 * 60 * 5;
const PERIODS = [300, 900, 1800, 7200, 14400, 86400];
const QUERY_CANDLE_AMOUNT = 100;

async function update() {
  console.log('data-synchronizer: Updating.');

  await importCurrencyPairs();

  console.log('data-synchronizer: Update complete.');

  idle();
}

function idle() {
  console.log('data-synchronizer: Idling for 5 minutes.');

  setTimeout(update, IDLE_TIMEOUT);
}

export default function graphql(app: Application): void {
  update();
}
