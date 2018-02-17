import * as moment from 'moment';
import { Application } from 'express';

import CurrencyPairRepository from '../common/database/repositories/CurrencyPairRepository';
import getDatabaseClient from '../common/database/client';

const IDLE_TIMEOUT = 1000 * 60 * 5;
const PERIODS = [ 300, 900, 1800, 7200, 14400, 86400 ];
const QUERY_CANDLE_AMOUNT = 100;

async function importCurrencyPairs() {
  console.log('data-synchronizer: Importing currency pairs.');

  const connection = await getDatabaseClient();
  const currencyPairRepository = connection.getCustomRepository(CurrencyPairRepository);

  await currencyPairRepository.import();
}

async function update() {
  console.log('data-synchronizer: Updating.');

  await importCurrencyPairs();

  idle();
}

function idle() {
  console.log('data-synchronizer: Idling for 5 minutes.');

  setTimeout(update, IDLE_TIMEOUT);
}

export default function graphql(app: Application): void {
  update();
}
