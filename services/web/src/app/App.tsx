import * as React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline';
import importedComponent from 'react-imported-component'
import { Helmet } from 'react-helmet'
import { Switch, Route, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { History } from 'history'

// @ts-ignore
import * as styles from './App.scss'
import { Navigation } from './navigation'

// @ts-ignore
const MarketListPage = importedComponent(() => import('./pages/market-list-page'))
// @ts-ignore
const AboutPage = importedComponent(() => import('./pages/about-page'))
// @ts-ignore
const NotFoundPage = importedComponent(() => import('./pages/not-found-page'))
// @ts-ignore
const DashboardPage = importedComponent(() => import('./pages/dashboard'))

type AppProps = {
  history: History,
}

const App = (props: AppProps) => {
  const { pathname } = props.history.location

  return (
    <div className={styles.application}>
      <CssBaseline/>
      <Helmet defaultTitle="Hello World!">
        <meta charSet="utf-8" />
      </Helmet>
      <Navigation path={pathname} />
      <Switch>
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/markets" component={MarketListPage} />
        <Route path="/about" component={AboutPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  )
}

export default hot(module)(App)
