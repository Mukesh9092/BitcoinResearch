import createBrowserHistory from 'history/createBrowserHistory'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import { rehydrateMarks } from 'react-imported-component'
import { BrowserRouter as Router } from 'react-router-dom'

import { App } from './App'
import { ApplicationStore } from '../../common/mobx/application'
import { getBrowserApolloClient } from '../../common/apollo/client'
import { isProduction } from '../../common/environment'

const applicationStore = new ApplicationStore()

const element: Element = document.getElementById('app')
const app: React.ReactElement<ApolloProvider> = (
  <ApolloProvider client={getBrowserApolloClient()}>
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

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.dispose()

  // @ts-ignore
  module.hot.accept()
}
