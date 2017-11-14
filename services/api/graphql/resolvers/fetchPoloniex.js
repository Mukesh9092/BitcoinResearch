module.exports = async queryString => {
  const queryURL = `https://poloniex.com/public?${queryString}`;

  const apiResult = await fetch(queryURL);
  const apiResultJSON = await apiResult.json();

  if (apiResultJSON.error) {
    throw new Error(apiResultJSON.error);
  }

  return apiResultJSON;
};
