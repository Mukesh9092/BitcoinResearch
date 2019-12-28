export const redirectAuthenticatedRequests = (to: string) => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect(to)
    }
    next()
  }
}
