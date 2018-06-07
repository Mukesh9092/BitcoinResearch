export default function authenticationHeaderInjection(app) {
  app.use((req, res, next) => {
    const { user, session } = req

    req.headers['x-user'] = user ? JSON.stringify(user) : ''
    req.headers['x-session'] = session ? JSON.stringify(session) : ''

    next()
  })
}
