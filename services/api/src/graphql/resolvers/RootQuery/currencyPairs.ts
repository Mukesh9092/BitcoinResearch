import CurrencyPairRepository from "../../../common/database/repositories/CurrencyPairRepository";
import getDatabaseClient from "../../../common/database/client";

export default async function currencyPairs() {
  try {
    // console.log("currencyPairs");

    const connection = await getDatabaseClient();

    // console.log("currencyPairs connection", connection);

    const currencyPairRepository = connection.getCustomRepository(CurrencyPairRepository);

    const importResult = await currencyPairRepository.import();

    // console.log("currencyPairs importResult", importResult);

    return importResult;
  } catch (error) {
    throw error;
  }
}
