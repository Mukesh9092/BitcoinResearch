const query = require("./query");

module.exports = table => {
  return id => {
    return query(table, cursor => {
      return cursor.get(id);
    });
  };
};
