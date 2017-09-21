const { makeExecutableSchema } = require('graphql-tools')
const {
  graphqlExpress,
  graphiqlExpress,
} = require('graphql-server-express')


const resolvers = require('../graphql/resolvers')
const schema = require('../graphql/schema')

module.exports = (app) => {
  app.all('/api/graphql', (req, res, next) => {
    console.log('REQUEST', req.url)
    console.log('HEADERS', req.headers)
    console.log('BODY', req.body)
    console.log('SESSION', req.session)
    console.log('USER', req.user)

    graphqlExpress({
      schema: makeExecutableSchema({
        typeDefs: schema,
        resolvers,
      })
    })(req, res, next)
  })

  app.use('/api/graphiql', graphiqlExpress({
    endpointURL: '/api/graphql',
  }));
}
