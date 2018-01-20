import CurrencyPairRepository from "../../../common/database/repositories/CurrencyPairRepository";
import getDatabaseClient from "../../../common/database/client";

export default async function currencyPairs() {
  try {
    const connection = await getDatabaseClient();

    const currencyPairRepository = connection.getCustomRepository(CurrencyPairRepository);

    const result = await currencyPairRepository.find();

    return result;
  } catch (error) {
    throw error;
  }
}
