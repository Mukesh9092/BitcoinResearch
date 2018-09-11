import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router } from 'react-router-dom'

import { getBrowserApolloClient } from './common/apollo-client'
import { log } from './common/log'
// import { isDevelopment } from './common/environment'

import { App } from './components/app'

log.setLevel('debug')

ReactDOM.hydrate(
  <ApolloProvider client={getBrowserApolloClient()}>
    <Router>
      <App history={createBrowserHistory()} />
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
