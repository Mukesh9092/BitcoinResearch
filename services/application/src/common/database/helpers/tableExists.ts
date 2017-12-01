export default async function tableExists(r, tableName) {
  const list = await r.tableList();

  return list.indexOf(tableName) >= 0;
};

