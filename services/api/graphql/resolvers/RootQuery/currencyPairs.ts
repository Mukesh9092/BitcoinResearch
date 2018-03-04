import { getKnexClient } from '../../../common/database/knex-client';

export default async function currencyPairs() {
  try {
    const knexClient = getKnexClient();

    let result = await knexClient('user')
      .select()
      .where({});

    return result;
  } catch (error) {
    throw error;
  }
}
