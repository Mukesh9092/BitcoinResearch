export default function authenticationHeaderExtraction(app) {
  app.use((req, res, next) => {
    try {
      const user = req.headers['x-user'];
      // console.log('​authenticationHeaderExtraction -> user', user);

      const session = req.headers['x-session'];
      // console.log('​authenticationHeaderExtraction -> session', session);

      // Needed for typing.
      const authenticatedRequest = req;

      authenticatedRequest.authentication = {
        user: user === '' ? null : JSON.parse(String(user)),
        session: session === '' ? null : JSON.parse(String(session)),
      };

      next();
    } catch (error) {
      next(error);
    }
  });
}
