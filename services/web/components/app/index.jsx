import React from 'react'
import { Route, Switch } from 'react-router-dom'

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
        <Route exact path="/" component={MarketListPage} />
        <Route path="/market/:key" component={MarketShowPage} />
        <Route path="/about" component={AboutPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  )
}

export const App = ApplicationComponent
