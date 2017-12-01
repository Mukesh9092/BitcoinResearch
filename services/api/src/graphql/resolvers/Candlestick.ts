import store from "../../common/database/store";

const mapperName = "currency";

export function currencyA(options: { currencyA: string }) {
  const { currencyA } = options;

  return store
    .getMapper(mapperName)
    .find(currencyA);
}

export function currencyB(options: { currencyB: string }) {
  const { currencyB } = options;

  return store
    .getMapper(mapperName)
    .find(currencyB);
}
