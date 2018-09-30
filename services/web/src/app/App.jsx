import React from 'react'
import importedComponent from 'react-imported-component'
import { Helmet } from 'react-helmet'
import { Switch, Route, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import { Navigation } from './navigation'

const MarketListPage = importedComponent(() => import('./pages/market-list-page'))
const AboutPage = importedComponent(() => import('./pages/about-page'))
const NotFoundPage = importedComponent(() => import('./pages/not-found-page'))

const App = () => {
  return (
    <div>
      <Helmet defaultTitle="Hello World!">
        <meta charSet="utf-8" />
      </Helmet>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Redirect to="/markets" />
        </Route>
        <Route path="/markets" component={MarketListPage} />
        <Route path="/about" component={AboutPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  )
}

export default hot(module)(App)
