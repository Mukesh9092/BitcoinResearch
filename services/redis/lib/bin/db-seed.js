#!/usr/bin/env node

const { createSeed } = require("../database");

createSeed()
  .then(() => process.exit())
  .catch(error => {
    console.log(formatError(error));
    process.exit();
  });
