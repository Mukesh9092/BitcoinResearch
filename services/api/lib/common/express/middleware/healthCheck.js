export function healthCheck(app) {
    app.get('/healthcheck', (req, res) => {
        res.json({
            health: 'ok',
        });
    });
    return app;
}
