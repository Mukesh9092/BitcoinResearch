const { resolve } = require 'path'

export default {
  db: {
    migrations: {
      directoryPath: resolve("#{__dirname}/server/migrations"),
    },
    seeds: {
      directoryPath: resolve("#{__dirname}/server/seeds"),
    },
  },
};
