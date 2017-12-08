import r from "rethinkdb";

import tableExists from "./tableExists";

export default async function ensureTable(r: r, tableName: string): void {
  const exists = await tableExists(r, tableName);

  if (exists) {
    return;
  }

  await r.tableCreate(tableName);
};
