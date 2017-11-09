const query = require("./query");

module.exports = table => {
  return records => {
    return query(table, cursor => {
      return cursor.insert(records);
    });
  };
};
