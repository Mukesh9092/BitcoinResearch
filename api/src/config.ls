{ resolve } = require 'path'

export
  db:
    migrations:
      directory-path: resolve "#{__dirname}/server/migrations"
    seeds:
      directory-path: resolve "#{__dirname}/server/seeds"
