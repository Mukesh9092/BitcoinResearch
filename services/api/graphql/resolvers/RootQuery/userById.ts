import { getKnexClient } from '../../../common/database/knex-client';

export default async (obj: Object, options: { id: string }) => {
  try {
    const knexClient = getKnexClient();

    let result = await knexClient('user')
      .select('*')
      .where({ id: options.id });

    return result;
  } catch (error) {
    throw error;
  }
};
