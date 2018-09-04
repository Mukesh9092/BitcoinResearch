import fetch from 'isomorphic-fetch'

// TODO: proper output type
export default async function fetchPoloniex(queryString) {
  const queryURL = `https://api2.poloniex.com/public?${queryString}`

  // console.log('fetchPoloniex', queryURL);

  const apiResult = await fetch(queryURL)
  const apiResultJSON = await apiResult.json()

  // console.log('fetchPoloniex apiResultJSON', apiResultJSON.length);

  if (apiResultJSON.error) {
    throw new Error(apiResultJSON.error)
  }

  return apiResultJSON
}