import React from 'react'
import ReactDOM from 'react-dom/server'
import createHistory from 'history/createMemoryHistory'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { Request, Response, NextFunction } from 'express'
import { StaticRouter } from 'react-router-dom'
import { getDataFromTree } from 'react-apollo'

import { getServerApolloClient } from '../common/apollo-client'

import webpackConfig from '../webpack.config'

import { App } from './components/app'

const PUBLIC_ASSET_PATH = webpackConfig[0].output.publicPath

function getClientAssets(res) {
  const webpackStats = res.locals.webpackStats.toJson()

  const [clientStats] = webpackStats.children.filter(x => x.name === 'client')

  return clientStats.assetsByChunkName
}

function getClientStyles(assets) {
  return _(assets)
    .values()
    .flatten()
    .filter(path => path.endsWith('.css'))
    .map(path => `<link rel="stylesheet" href="${PUBLIC_ASSET_PATH}${path}" />`)
    .join('\n')
}

function getClientScripts(assets) {
  return _(assets)
    .values()
    .flatten()
    .filter(path => path.endsWith('.js'))
    .map(path => `<script src="${PUBLIC_ASSET_PATH}${path}" /></script>`)
    .join('\n')
}

export default options => async (req, res, next) => {
  try {
    const apolloClient = getServerApolloClient({ headers: req.headers })

    const history = createHistory({ initialEntries: [req.path] })
    const renderContext = {}
    const appComponent = (
      <ApolloProvider client={apolloClient}>
        <StaticRouter location={req.url} context={renderContext}>
          <App history={history} />
        </StaticRouter>
      </ApolloProvider>
    )

    await getDataFromTree(appComponent)
    const initialState = apolloClient.cache.extract()
    const app = ReactDOM.renderToString(appComponent)

    if (renderContext.url) {
      res.writeHead(302, {
        Location: renderContext.url,
      })
      res.end()
      return
    }

    const title = 'Title'

    const clientAssets = getClientAssets(res)
    const styles = getClientStyles(clientAssets)
    const scripts = getClientScripts(clientAssets)

    console.log('TITLE', title)
    console.log('STYLES', styles)
    console.log('SCRIPTS', scripts)

    // TODO: Include material stylesheets directly.

    const html = `
      <!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>${title}</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
            ${styles}
            <script>
              window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(
                /</g,
                '\\u003c',
              )}
            </script>
          </head>
          <body>
            <div id="root">${app}</div>
            ${scripts}
          </body>
        </html>
    `

    res.send(html)
  } catch (error) {
    next(error)
  }
}
