export function authenticationHeaderInjection(app) {
  app.use((req, res, next) => {
    try {
      const { user, session } = req.authentication

      if (user) {
        req.headers['x-user'] = JSON.stringify(user)
      }

      if (session) {
        req.headers['x-session'] = JSON.stringify(session)
      }

      next()
    } catch (error) {
      next(error)
    }
  })

  return app
}
