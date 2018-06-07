import middleware from 'webpack-dev-middleware';

export default function webpackDevMiddleware(app, compiler, options) {
  app.use(middleware(compiler, options));
}
