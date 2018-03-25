export default function logout(req, res, next) {
  const { session } = req;

  if (!session) {
    res.sendStatus(401);
  }

  session &&
    session.destroy(error => {
      if (error) {
        next(error);
        return;
      }

      req.logout();
      res.sendStatus(200);
    });
}
