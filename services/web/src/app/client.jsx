import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router } from 'react-router-dom'
import { rehydrateMarks } from 'react-imported-component'

import App from './App' // eslint-disable-line
import importedComponents from './imported' // eslint-disable-line
import { getBrowserApolloClient } from '../../common/apollo/client'

const element = document.getElementById('app')
const app = (
  <ApolloProvider client={getBrowserApolloClient()}>
    <Router>
      <App history={createBrowserHistory()} />
    </Router>
  </ApolloProvider>
)

if (process.env.NODE_ENV === 'production') {
  rehydrateMarks().then(() => {
    ReactDOM.hydrate(app, element)
  })
} else {
  ReactDOM.render(app, element)
}

if (module.hot) {
  module.hot.dispose()
  module.hot.accept()
}
