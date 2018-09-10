import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Navigation } from '../navigation'

// import MarketListPage from '../pages/market-list-page'
// import AboutPage from '../pages/about-page'
// import NotFoundPage from '../pages/not-found-page'
// import MarketShowPage from '../pages/market-show-page'

import s from './index.scss'

console.log('S', s)

export const ApplicationComponent = () => {
  return (
    <div className="application">
      <Navigation />
      LOL12345
      {/* <Switch> */}
      {/*   <Route exact path="/"> */}
      {/*     <Redirect to="/markets" /> */}
      {/*   </Route> */}
      {/*   <Route path="/markets/:key" component={MarketShowPage} /> */}
      {/*   <Route path="/markets" component={MarketListPage} /> */}
      {/*   <Route path="/about" component={AboutPage} /> */}
      {/*   <Route component={NotFoundPage} /> */}
      {/* </Switch> */}
    </div>
  )
}

export const App = ApplicationComponent
