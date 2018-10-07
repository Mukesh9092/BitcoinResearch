import * as React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router } from 'react-router-dom'
import { rehydrateMarks } from 'react-imported-component'

import App from './App' // eslint-disable-line
import { getBrowserApolloClient } from '../../common/apollo/client'
import { isProduction } from '../../common/environment'

const element: Element = document.getElementById('app')
const app: React.ReactElement<any> = (
  <ApolloProvider client={getBrowserApolloClient()}>
    <Router>
      <App history={createBrowserHistory()} />
    </Router>
  </ApolloProvider>
)

if (isProduction()) {
  rehydrateMarks().then(() => {
    ReactDOM.hydrate(app, element)
  })
} else {
  ReactDOM.render(app, element)
}

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.dispose()

  // @ts-ignore
  module.hot.accept()
}
