import _ from 'lodash';
import { Response } from 'express';

import webpackConfig from '../../webpack.config';

const PUBLIC_ASSET_PATH = webpackConfig[0].output.publicPath;

export function getClientAssets(res) {
  const webpackStats = res.locals.webpackStats.toJson();

  const [clientStats] = webpackStats.children.filter(x => x.name === 'client');

  return clientStats.assetsByChunkName;
}

export function getClientStyles(assets) {
  return _(assets)
    .values()
    .flatten()
    .filter(path => path.endsWith('.css'))
    .map(path => `<link rel="stylesheet" href="${PUBLIC_ASSET_PATH}${path}" />`)
    .join('\n');
}

export function getClientScripts(assets) {
  return _(assets)
    .values()
    .flatten()
    .filter(path => path.endsWith('.js'))
    .map(path => `<script src="${PUBLIC_ASSET_PATH}${path}" /></script>`)
    .join('\n');
}
