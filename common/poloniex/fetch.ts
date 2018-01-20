import * as fetch from "isomorphic-unfetch";

import { getThrottledPromise } from "../promise";

export default async function fetch(queryString: string): Promise<string> {
  return getThrottledPromise()
    .add(() => {
      const queryURL = `https://api2.poloniex.com/public?${queryString}`;

      const apiResult = await fetch(queryURL);
      const apiResultJSON = await apiResult.json();

      if (apiResultJSON.error) {
        throw new Error(apiResultJSON.error);
      }

      return apiResultJSON;
    });
}
