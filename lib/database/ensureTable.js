const rethinkdb = require("rethinkdb");
const getDatabase = require("./getDatabase");

module.exports = async (table) => {
  try {
    const db = await getDatabase();
    const result = await rethinkdb.tableCreate(table).run(db);

    return result;
  } catch (e) {
    if (e.message && !e.message === `Table \`${table}\` already exists`) {
      throw e
    }

    return;
  }
};
