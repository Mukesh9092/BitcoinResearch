import React from 'react'
import { css } from 'emotion'
import { hot } from 'react-hot-loader'

import { Navigation } from '../navigation'
// import { Redirect, Route, Switch } from 'react-router-dom'

// import MarketListPage from '../pages/market-list-page'
// import AboutPage from '../pages/about-page'
// import NotFoundPage from '../pages/not-found-page'
// import MarketShowPage from '../pages/market-show-page'

const className = css`
  background-color: #00ff00;
`

export const ApplicationComponent = () => (
  <div className={className}>
    <Navigation />
    <div>Content</div>
  </div>
)

export const App = hot(module)(ApplicationComponent)

//   <Switch>
//   <Route exact path="/">
//   <Redirect to="/markets" />
//   </Route>
// <Route path="/markets/:key" component={MarketShowPage} />
// <Route path="/markets" component={MarketListPage} />
// <Route path="/about" component={AboutPage} />
// <Route component={NotFoundPage} />
// </Switch>
