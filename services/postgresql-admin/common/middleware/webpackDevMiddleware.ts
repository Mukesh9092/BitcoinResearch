import { Application } from 'express';
import middleware from 'webpack-dev-middleware';

export default function webpackDevMiddleware(
  app: Application,
  compiler: any,
  options: any,
) {
  app.use(middleware(compiler, options));
}
