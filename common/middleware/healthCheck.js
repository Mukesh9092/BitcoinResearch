export default function healthCheck(app) {
  app.get('/healthcheck', (req, res, next) => {
    res.json({
      health: 'ok',
    })
  })
}
