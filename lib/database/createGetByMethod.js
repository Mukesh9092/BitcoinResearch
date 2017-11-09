const query = require("./query");

module.exports = (table, key) => {
  return async (value) => {
    const result = await query(table, cursor => {
      return cursor.filter({
        [key]: value
      });
    });

    const resultArray = await result.toArray();

    return resultArray[0];
  };
};
