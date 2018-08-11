import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Navigation } from '../navigation'

import AboutPage from '../pages/about-page'
import MarketListPage from '../pages/market-list-page'
import MarketShowPage from '../pages/market-show-page'
import NotFoundPage from '../pages/not-found-page'

export const ApplicationComponent = (props) => {
  return (
    <React.Fragment>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Redirect to="/markets" />
        </Route>
        <Route path="/markets/:key" component={MarketShowPage} />
        <Route path="/markets" component={MarketListPage} />
        <Route path="/about" component={AboutPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  )
}

export const App = ApplicationComponent
