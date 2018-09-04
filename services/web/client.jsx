import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import { ApolloProvider } from 'react-apollo'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'

import { getBrowserApolloClient } from './common/apollo-client'
import { log } from './common/log'
import { isDevelopment } from './common/environment'

import { App } from './components/app'

const reactHistory = createHistory()
const apolloClient = getBrowserApolloClient()

const rootElement = document.getElementById('root')

let render = (AppComponent) => {
  ReactDOM.hydrate(
    <ApolloProvider client={apolloClient}>
      <Router history={reactHistory}>
        <AppComponent history={reactHistory} />
      </Router>
    </ApolloProvider>,
    rootElement,
  )
}

if (isDevelopment()) {
  log.setLevel('debug')

  render = (AppComponent) => {
    ReactDOM.hydrate(
      <AppContainer>
        <ApolloProvider client={apolloClient}>
          <Router history={reactHistory}>
            <AppComponent history={reactHistory} />
          </Router>
        </ApolloProvider>
      </AppContainer>,
      rootElement,
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
