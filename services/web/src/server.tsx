import React from 'react';
import ReactDOM from 'react-dom/server';
import _ from 'lodash';
import createHistory from 'history/createMemoryHistory';
import { StaticRouter } from 'react-router-dom';
import { Request, Response, NextFunction } from 'express';

import webpackConfig from '../webpack.config';
import { App } from '../src/components/app';

global.window = {};

const PUBLIC_ASSET_PATH = webpackConfig[0].output.publicPath;

interface WebpackAssets {
  [key: string]: string;
}

function normalizeToArray(x: any) {
  return Array.isArray(x) ? x : [x];
}

function getClientAssets(res: Response): WebpackAssets {
  const webpackStats = res.locals.webpackStats.toJson();

  const [clientStats] = webpackStats.children.filter(
    (x: { name: string }) => x.name === 'client',
  );

  return clientStats.assetsByChunkName;
}

function getClientStyles(assets: WebpackAssets) {
  return _(assets)
    .values()
    .flatten()
    .filter((path: string) => path.endsWith('.css'))
    .map(
      (path: string) =>
        `<link rel="stylesheet" href="${PUBLIC_ASSET_PATH}${path}" />`,
    )
    .join('\n');
}

function getClientScripts(assets: WebpackAssets) {
  return _(assets)
    .values()
    .flatten()
    .filter((path: string) => path.endsWith('.js'))
    .map(
      (path: string) => `<script src="${PUBLIC_ASSET_PATH}${path}" /></script>`,
    )
    .join('\n');
}

interface RenderContext {
  url?: string;
}

export default (options: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const history = createHistory({ initialEntries: [req.path] });
    const renderContext: RenderContext = {};
    const app = ReactDOM.renderToString(
      <StaticRouter location={req.url} context={renderContext}>
        <App history={history} />
      </StaticRouter>,
    );

    if (renderContext.url) {
      res.writeHead(302, {
        Location: renderContext.url,
      });
      res.end();
      return;
    }

    const title = 'Title';

    const clientAssets = getClientAssets(res);
    const styles = getClientStyles(clientAssets);
    const scripts = getClientScripts(clientAssets);

    console.log('TITLE', title);
    console.log('STYLES', styles);
    console.log('SCRIPTS', scripts);

    const html = `
      <!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>${title}</title>
            ${styles}
          </head>
          <body>
            <div id="root">${app}</div>
            ${scripts}
          </body>
        </html>
    `;

    res.send(html);
  };
};
