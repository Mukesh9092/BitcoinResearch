const query = require("./query");

module.exports = (table, key) => {
  return value => {
    return query(table, cursor => {
      const output = cursor.filter({
        [key]: value
      });

      return output;
    })
      .then(x => x.toArray())
      .then(([x]) => x);
  };
};
