export default function authenticationHeaderExtraction(app) {
  app.use((req, res, next) => {
    try {
      const user = req.headers['x-user']

      const session = req.headers['x-session']

      req.authentication = {
        user: user === '' ? null : JSON.parse(String(user)),
        session: session === '' ? null : JSON.parse(String(session)),
      }

      next()
    } catch (error) {
      next(error)
    }
  })
}
