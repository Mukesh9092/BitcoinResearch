import express from 'express';
import { createServer } from 'http';
export async function expressServiceWith(middleware, host, port) {
    const app = express();
    await middleware(app);
    app.server = createServer(app);
    app.server.listen(port, host, (error) => {
        if (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            return;
        }
        // eslint-disable-next-line no-console
        console.log(`HTTP Server listening at http://${host}:${port}.`);
    });
    return app;
}
