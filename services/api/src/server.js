import unhandledError from 'unhandled-error'
import gql from 'graphql-tag'

import expressServiceWithMiddleware from '../common/express/middleware/expressServiceWith'
import genericExpressService from '../common/express/middleware/genericExpressService'
import loggerMiddleware from '../common/express/middleware/logger'

const { API_HOST, API_PORT } = process.env

const ensureAdminUser = async () => {
};

expressServiceWithMiddleware(
  async (app) => {
    try {
      genericExpressService(app)
      loggerMiddleware(app)

      return app
    } catch (error) {
      console.error(error)
    }
  },
  API_HOST,
  API_PORT,
)

unhandledError((error) => {
  console.error(error)
})
