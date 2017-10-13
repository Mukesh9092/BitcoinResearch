#!/usr/bin/env node

const { createSeed, createTables, destroyTables } = require("../database");

destroyTables()
  .then(createTables)
  .then(createSeed)
  .then(() => process.exit())
  .catch(error => {
    console.log(formatError(error));
    process.exit();
  });
