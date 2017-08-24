const rethinkdb = require('rethinkdb')

const { getDatabase } = require('../../lib/database')

const toArray = x => x.toArray()
const firstElement = ([x]) => x

exports.getArticles = () => {
  return getDatabase()
    .then((db) => {
      return rethinkdb
        .table('articles')
        .run(db)
        .then(toArray)
    })
}

exports.getArticlesByUserId = (user_id) => {
  return getDatabase()
    .then((db) => {
      return rethinkdb
        .table('articles')
        .filter(rethinkdb.row('user_id').eq(user_id))
        .run(db)
        .then(toArray)
    })
}

exports.getArticlesByUsername = (user_name) => {
  return getDatabase()
    .then((db) => {
      return rethinkdb
        .table('articles')
        .filter(rethinkdb.row('username').eq(username))
        .run(db)
        .then(toArray)
    })
}

exports.getArticlesByEmail = (email) => {
  return getDatabase()
    .then((db) => {
      return rethinkdb
        .table('articles')
        .filter(rethinkdb.row('email').eq(email))
        .run(db)
        .then(toArray)
    })
}

exports.getArticlesByTag = (email) => {
  return []
}

exports.getArticleById = () => {
  return getDatabase()
    .then((db) => {
      return rethinkdb
        .table('articles')
        .get(id)
        .run(db)
        .then(toArray)
        .then(firstElement)
    })
}

exports.getArticleById = () => {
  return getDatabase()
    .then((db) => {
      return rethinkdb
        .table('articles')
        .filter(rethinkdb.row('slug').eq(slug))
        .run(db)
        .then(toArray)
        .then(firstElement)
    })
}
