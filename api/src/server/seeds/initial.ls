faker = require 'faker'
log   = require 'loglevel'

{
  genRandomString
  sha512
} = require '../../lib/authentication'

get-random-identifier = -> Math.floor Math.random! * 20

print-header = (name) ->
  log.info ''
  log.info name

print-record = (record) ->
  log.info ''
  log.info '  record:', JSON.stringify record

export seed = (knex) ->
  Promise.resolve!
    .then ->
      print-header 'Creating users.'

      email             = 'admin@test.com'
      username          = 'admin'
      password-seed     = gen-random-string 64
      { password-hash } = sha512 'test', password-seed
      record            =
        id: i + 1
        email: email
        username: username
        password_seed: password-seed
        password_hash: password-hash

      print-record record

      promises.push (knex 'users').insert record

      promises = []
      for i from 0 to 20
        email             = faker.internet.email!
        username          = faker.internet.user-name!
        password-seed     = gen-random-string 64
        { password-hash } = sha512 'test', password-seed
        record            =
          id: i
          email: email
          username: username
          password_seed: password-seed
          password_hash: password-hash

        print-record record

        promises.push (knex 'users').insert record

      Promise.all promises

    .then ->
      print-header 'Creating tags.'

      promises = []
      for i from 0 to 20
        record =
          id: i
          label: faker.lorem.word!

        print-record record

        promises.push (knex 'tags').insert record

      Promise.all promises

    .then ->
      print-header 'Creating articles.'

      promises = []
      for i from 0 to 20
        title   = faker.lorem.words!
        slug    = faker.helpers.slugify title
        record  =
          id: i
          title: title
          slug: slug
          body: faker.lorem.paragraphs 10
          created: new Date!
          updated: new Date!
          user_id: get-random-identifier!

        print-record record

        promises.push (knex 'articles').insert record

      Promise.all promises

    .then ->
      print-header 'Creating comments.'

      promises = []
      for i from 0 to 20
        record =
          id: i
          body: faker.lorem.paragraphs 3
          created: new Date!
          updated: new Date!
          user_id: get-random-identifier!
          article_id: get-random-identifier!

        print-record record

        promises.push (knex 'comments').insert record

      Promise.all promises

    .then ->
      print-header 'Tagging articles.'

      promises = []
      for i from 0 to 20
        record =
          article_id: get-random-identifier!,
          tag_id: get-random-identifier!,

        print-record record

        promises.push (knex 'articles_tags').insert record

      Promise.all promises
