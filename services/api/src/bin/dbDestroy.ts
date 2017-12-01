import { destroyTables } from "../common/database";

destroyTables()
  .then(() => process.exit())
  .catch(error => {
    throw error;
  });
