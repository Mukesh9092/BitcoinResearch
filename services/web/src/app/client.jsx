import '@babel/polyfill'

import * as React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router } from 'react-router-dom'
import { rehydrateMarks } from 'react-imported-component'

import { App } from './App'
import { ApplicationStore } from '../common/mobx/application'
import { getApolloClient } from '../common/apollo/client'
import { isProduction } from '../common/environment'

const applicationStore = new ApplicationStore()

const apolloClient = getApolloClient()

const element = document.getElementById('app')
const app = (
  <ApolloProvider client={apolloClient}>
    <Router>
      <App history={createBrowserHistory()} application={applicationStore} />
    </Router>
  </ApolloProvider>
)

const start = async () => {
  if (isProduction()) {
    await rehydrateMarks()
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
