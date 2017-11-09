const createTable = require("./createTable");

const tables = ["users", "articles", "currencies"];

module.exports = async () => {
  console.log(`Creating tables: ${tables.join(", ")}.`);

  await Promise.all(tables.map(createTable));
};
