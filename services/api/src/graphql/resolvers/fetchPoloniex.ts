import fetch from "isomorphic-fetch";

// TODO: proper output type
export default async function fetchPoloniex(queryString: string): Promise<string> {
  const queryURL = `https://poloniex.com/public?${queryString}`;

  const apiResult = await fetch(queryURL);
  const apiResultJSON = await apiResult.json();

  if (apiResultJSON.error) {
    throw new Error(apiResultJSON.error);
  }

  return apiResultJSON;
}
