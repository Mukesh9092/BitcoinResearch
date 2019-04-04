import * as React from 'react'
import ReactDOM from 'react-dom'
// import createBrowserHistory from 'history/createBrowserHistory'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './app'
import { getApolloClient } from '../common/apollo/client'
import { isProduction } from '../common/environment'

const apolloClient = getApolloClient()

const element = document.getElementById('app')
const app = (
  <ApolloProvider client={apolloClient}>
    <Router>
      {/* <App history={createBrowserHistory()} /> */}
      <App />
    </Router>
  </ApolloProvider>
)

const start = async () => {
  if (isProduction()) {
    ReactDOM.hydrate(app, element)
  } else {
    ReactDOM.render(app, element)
  }
}

start()

if (module.hot) {
  module.hot.dispose()
  module.hot.accept()
}
