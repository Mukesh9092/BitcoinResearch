import isomorphicFetch from 'isomorphic-fetch';

import { getThrottledPromise } from '../promise';

const throttle = getThrottledPromise();

export default async function fetch(queryString: string): Promise<string> {
  return throttle(async () => {
    const queryURL = `https://api2.poloniex.com/public?${queryString}`;

    const apiResult = await isomorphicFetch(queryURL);
    const apiResultJSON = await apiResult.json();

    if (apiResultJSON.error) {
      throw new Error(apiResultJSON.error);
    }

    return apiResultJSON;
  });
}
