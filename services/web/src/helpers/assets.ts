import _ from 'lodash';
import { Response } from 'express';

import webpackConfig from '../../webpack.config';

const PUBLIC_ASSET_PATH = webpackConfig[0].output.publicPath;

interface WebpackAssets {
  [key: string]: string;
}

export function getClientAssets(res: Response): WebpackAssets {
  const webpackStats = res.locals.webpackStats.toJson();

  const [clientStats] = webpackStats.children.filter(
    (x: { name: string }) => x.name === 'client',
  );

  return clientStats.assetsByChunkName;
}

export function getClientStyles(assets: WebpackAssets): string {
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

export function getClientScripts(assets: WebpackAssets): string {
  return _(assets)
    .values()
    .flatten()
    .filter((path: string) => path.endsWith('.js'))
    .map(
      (path: string) => `<script src="${PUBLIC_ASSET_PATH}${path}" /></script>`,
    )
    .join('\n');
}
