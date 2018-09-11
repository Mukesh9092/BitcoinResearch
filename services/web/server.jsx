// Ignore styles on the server side.
// import 'ignore-styles'

import React from 'react'
import _ from 'lodash'
import createHistory from 'history/createMemoryHistory'
import fetch from 'cross-fetch'
import { Router } from 'react-router-dom' // Specificly don't use StaticRouter so we can override history
import { extractCritical } from 'emotion-server'
import { getDataFromTree, ApolloProvider } from 'react-apollo'
import { renderToString } from 'react-dom/server'

import { getServerApolloClient } from './common/apollo-client'
import { log } from './common/log'

// import webpackConfig from './webpack.config'
import { App } from './components/app'

global.fetch = fetch
log.setLevel('debug')

// const { PUBLIC_ASSET_PATH } = process.env
const PUBLIC_ASSET_PATH = '/static'

function getClientAssets(res) {
  log.debug('getClientAssets res.locals.webpackStats?', res.locals.webpackStats)

  if (!res.locals.webpackStats) {
    return {}
  }

  const webpackStats = res.locals.webpackStats.toJson()
  const [clientStats] = webpackStats.children.filter((x) => x.name === 'client')

  const { assetsByChunkName } = clientStats

  return assetsByChunkName
}

function getClientStyles(assets) {
  return _(assets)
    .values()
    .flatten()
    .filter((path) => path.endsWith('.css'))
    .map((path) => `<link rel="stylesheet" href="${PUBLIC_ASSET_PATH}/${path}" />`)
    .join('\n')
}

function getClientScripts(assets) {
  return _(assets)
    .values()
    .flatten()
    .filter((path) => path.endsWith('.js'))
    .map((path) => `<script src="${PUBLIC_ASSET_PATH}/${path}" /></script>`)
    .join('\n')
}

export default () => async (req, res, next) => {
  log.debug('server req', req.url)

  try {
    const apolloClient = getServerApolloClient({ headers: req.headers })
    const reactHistory = createHistory({ initialEntries: [req.path] })
    const context = {}
    const appComponent = (
      <ApolloProvider client={apolloClient}>
        <Router history={reactHistory} location={req.url} context={context}>
          <App history={reactHistory} />
        </Router>
      </ApolloProvider>
    )

    const title = 'Title'

    const clientAssets = getClientAssets(res)
    const styles = getClientStyles(clientAssets)
    const scripts = getClientScripts(clientAssets)

    log.debug('server clientAssets', clientAssets)
    log.debug('server styles', styles)
    log.debug('server scripts', scripts)

    const appString = renderToString(appComponent)
    const appCritical = extractCritical(appString)

    log.debug('server appString', appString)
    log.debug('server appCritical', appCritical)

    await getDataFromTree(appComponent)
    const initialState = apolloClient.cache.extract()

    log.debug('server initialState', initialState)

    const html = `
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>${title}</title>
            <style>${appCritical.css}</style>
            ${styles}
            <script>
              window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')}
            </script>
          </head>
          <body>
            <div id="root">${appCritical.html}</div>
            ${scripts}
          </body>
        </html>
      `

    if (context.url) {
      res.writeHead(302, {
        Location: context.url,
      })
      res.end()
    } else {
      res.write(html)
      res.end()
    }
  } catch (err) {
    next(err)
  }
}
