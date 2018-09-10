// Ignore styles on the server side.
// import 'ignore-styles'

import React from 'react'
import ReactDOM from 'react-dom/server'
import _ from 'lodash'
import createHistory from 'history/createMemoryHistory'
import { getDataFromTree, ApolloProvider } from 'react-apollo'
// Specificly don't use StaticRouter so we can override history
import { Router } from 'react-router-dom'

import { getServerApolloClient } from './common/apollo-client'
import { log } from './common/log'

import webpackConfig from './webpack.config'
import { App } from './components/app'

log.setLevel('debug')

// const { PUBLIC_ASSET_PATH } = process.env

const PUBLIC_ASSET_PATH = '/static/'

function getClientAssets(res) {
  // log.debug('getClientAssets')

  if (!res.locals.webpackStats) {
    return {}
  }

  const webpackStats = res.locals.webpackStats.toJson()
  const [clientStats] = webpackStats.children.filter((x) => {
    return x.name === 'client'
  })

  const { assetsByChunkName } = clientStats

  return assetsByChunkName
}

function getClientStyles(assets) {
  log.debug(
    'getClientStyles',
    _(assets)
      .values()
      .flatten(),
  )

  return _(assets)
    .values()
    .flatten()
    .filter((path) => {
      return path.endsWith('.css')
    })
    .map((path) => {
      return `<link rel="stylesheet" href="${PUBLIC_ASSET_PATH}${path}" />`
    })
    .join('\n')
}

function getClientScripts(assets) {
  return _(assets)
    .values()
    .flatten()
    .filter((path) => {
      return path.endsWith('.js')
    })
    .map((path) => {
      return `<script src="${PUBLIC_ASSET_PATH}${path}" /></script>`
    })
    .join('\n')
}

export default () => {
  return async (req, res, next) => {
    try {
      console.log(1)
      console.log(1.1, req.url)
      console.log(1.2, res.locals)

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

      console.log(2)

      await getDataFromTree(appComponent)
      const initialState = apolloClient.cache.extract()
      const apolloScript = `
        <script>
          window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(
            /</g,
            '\\u003c',
          )}
        </script>
      `

      console.log(3)

      const title = 'Title'

      const clientAssets = getClientAssets(res)
      const styles = getClientStyles(clientAssets)
      const scripts = getClientScripts(clientAssets)

      log.debug('clientAssets', clientAssets)
      log.debug('styles', styles)
      log.debug('scripts', scripts)

      const app = ReactDOM.renderToString(appComponent)
      const html = `
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>${title}</title>
            ${styles}
            ${apolloScript}
          </head>
          <body>
            <div id="root">${app}</div>
            ${scripts}
          </body>
        </html>
      `

      console.log(4)

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
}
