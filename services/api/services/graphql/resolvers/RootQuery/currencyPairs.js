import { getKnexClient } from '../../../../common/database/knex-client'

export default async function currencyPairs() {
  try {
    const knexClient = getKnexClient()

    let result = await knexClient('currency_pair')
      .select()
      .where({})

    return result
  } catch (error) {
    throw error
  }
}
