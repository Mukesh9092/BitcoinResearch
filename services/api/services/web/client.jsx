import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import { ApolloProvider } from 'react-apollo'
import { App } from './components/app'
import { AppContainer } from 'react-hot-loader'
import { Router } from 'react-router-dom'

import { getBrowserApolloClient } from '../../common/apollo-client'
import { log } from '../../common/log'
import { isDevelopment } from '../../common/environment'

const history = createHistory()
const apolloClient = getBrowserApolloClient()

let render = AppComponent => {
  ReactDOM.hydrate(
    <ApolloProvider client={apolloClient}>
      <Router history={history}>
        <AppComponent history={history} />
      </Router>
    </ApolloProvider>,
    document.getElementById('root'),
  )
}

if (isDevelopment()) {
  log.setLevel('debug')

  render = AppComponent => {
    ReactDOM.hydrate(
      <AppContainer>
        <ApolloProvider client={apolloClient}>
          <Router history={history}>
            <AppComponent history={history} />
          </Router>
        </ApolloProvider>
      </AppContainer>,
      document.getElementById('root'),
    )
  }

  module.hot.accept('./components/app', () => {
    log.debug('Update to ./components/app')

    const { App: NewApp } = require('./components/app')

    log.debug(NewApp)

    render(NewApp)
  })
}

render(App)
