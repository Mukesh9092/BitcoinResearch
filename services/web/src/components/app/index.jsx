import React from 'react'
import { History } from 'history'
import { Route } from 'react-router-dom'

import { Navigation } from '../navigation'

import { About } from '../pages/about'
import { Home } from '../pages/home'
import { OrderBook } from '../pages/orderbook'

import * as styles from './styles'

export const ApplicationComponent = props => {
  return (
    <React.Fragment>
      <Navigation />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/orderbook/:marketKey" component={OrderBook} />
    </React.Fragment>
  )
}

export const App = ApplicationComponent
