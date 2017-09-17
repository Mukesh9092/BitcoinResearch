#!/usr/bin/env node

const { createTables } = require("../database");

const { formatError } = require('../errors');

createTables()
  .then(() => process.exit())
  .catch(error => {
    console.log(formatError(error))
    process.exit();
  });
