const rethinkdb = require("rethinkdb");

const destroyTable = require("./destroyTable");
const getDatabase = require("./getDatabase");

module.exports = () => {
  return getDatabase().then(db => {
    return rethinkdb
      .tableList()
      .run(db)
      .then(dbTables => {
        console.log(`Destroying tables: ${dbTables.join(", ")}.`);

        return Promise.all(
          dbTables.map(table => {
            return destroyTable(db, table);
          })
        );
      });
  });
};
