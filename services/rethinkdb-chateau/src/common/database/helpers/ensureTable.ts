import tableExists from "./tableExists";

export default async function ensureTable(r, tableName) {
  const exists = await tableExists(r, tableName);

  if (exists) {
    return;
  }

  await r.tableCreate(tableName);
};
