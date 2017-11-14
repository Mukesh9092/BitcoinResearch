module.exports = async function tableExists(r, tableName) {
  const list = await r.tableList();

  if (list.indexOf(tableName) >= 0) {
    return true;
  }

  return false;
};
