const { makeExecutableSchema } = require('graphql-tools')
const {
  graphqlExpress,
  graphiqlExpress,
} = require('graphql-server-express')


const resolvers = require('../graphql/resolvers')
const schema = require('../graphql/schema')

module.exports = (app) => {
  app.all('/api/graphql', graphqlExpress({
    schema: makeExecutableSchema({
      typeDefs: schema,
      resolvers,
    })
  }))

  app.use('/api/graphiql', graphiqlExpress({
    endpointURL: '/api/graphql',
  }));
}
