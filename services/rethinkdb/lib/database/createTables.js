const getDatabase = require("./getDatabase");
const createTable = require("./createTable");

const tables = ["users", "articles", "currencies"];

module.exports = () => {
  console.log(`Creating tables: ${tables.join(", ")}.`);

  return getDatabase().then(db =>
    Promise.all(
      tables.map(table => {
        return createTable(db, table);
      })
    )
  );
};
