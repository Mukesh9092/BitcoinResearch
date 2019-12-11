export function authenticationHeaderExtraction(app) {
    app.use((req, res, next) => {
        try {
            const user = String(req.headers['x-user']);
            const session = String(req.headers['x-session']);
            req.authentication = {
                session: session === '' ? undefined : JSON.parse(String(session)),
                user: user === '' ? undefined : JSON.parse(String(user)),
            };
            next();
        }
        catch (error) {
            next(error);
        }
    });
    return app;
}
