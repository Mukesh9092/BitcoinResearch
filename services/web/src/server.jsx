import React from 'react';
import ReactDOM from 'react-dom/server';
import createHistory from 'history/createMemoryHistory';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { Request, Response, NextFunction } from 'express';
import { StaticRouter } from 'react-router-dom';

import normalizeStyle from 'normalize.css';
import blueprintStyle from '../node_modules/@blueprintjs/core/dist/blueprint.css';

import apolloClient from './apollo-client';
import store from './store';
import { App } from './components/app';
import {
  getClientAssets,
  getClientScripts,
  getClientStyles,
} from './helpers/assets';

export default options => (req, res, next) => {
  const history = createHistory({ initialEntries: [req.path] });
  const renderContext = {};
  const app = ReactDOM.renderToString(<ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <StaticRouter location={req.url} context={renderContext}>
        <App history={history} />
      </StaticRouter>
    </Provider>
                                      </ApolloProvider>);

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
            <style type="text/css">
              ${normalizeStyle.toString()}
            </style>
            <style type="text/css">
              ${blueprintStyle.toString()}
            </style>
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
