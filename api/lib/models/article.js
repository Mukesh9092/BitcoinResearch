const rethinkdb = require('rethinkdb')

const { getDatabase } = require('../../lib/database')

const toArray = x => x.toArray()
const firstElement = ([x]) => x

function getArticles() {
  // console.log('lib/models/article getArticles')

  return getDatabase()
    .then((db) => {
      return rethinkdb
        .table('articles')
        .run(db)
        .then(toArray)
    })
}

function getArticlesByUserId(userId) {
  // console.log('lib/models/article getArticlesByUserId', userId)

  return getDatabase()
    .then((db) => {
      return rethinkdb
        .table('articles')
        .filter(rethinkdb.row('userId').eq(userId))
        .run(db)
        .then(toArray)
    })
}

function getArticlesByUsername(username) {
  // console.log('lib/models/article getArticlesByUsername', username)

  return getDatabase()
    .then((db) => {
      return rethinkdb
        .table('articles')
        .filter(rethinkdb.row('username').eq(username))
        .run(db)
        .then(toArray)
    })
}

function getArticlesByEmail(email) {
  // console.log('lib/models/article getArticlesByEmail', email)

  return getDatabase()
    .then((db) => {
      return rethinkdb
        .table('articles')
        .filter(rethinkdb.row('email').eq(email))
        .run(db)
        .then(toArray)
    })
}

function getArticlesByTag(tag) {
  // console.log('lib/models/article getArticlesByTag', tag)

  return []
}

function getArticleById(id) {
  // console.log('lib/models/article getArticleById', id)

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

function getArticleBySlug(slug) {
  // console.log('lib/models/article getArticleBySlug', slug)

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

module.exports = {
  getArticles,
  getArticlesByEmail,
  getArticlesByTag,
  getArticlesByUsername,
  getArticlesByUserId,
  getArticlesByEmail,
  getArticlesByTag,
  getArticleById,
  getArticleBySlug,
}
