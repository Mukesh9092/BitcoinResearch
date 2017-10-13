#!/usr/bin/env node

const { destroyTables } = require("../database");

destroyTables()
  .then(() => process.exit())
  .catch(error => {
    console.log(formatError(error));
    process.exit();
  });
