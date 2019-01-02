import { hot } from 'react-hot-loader'
import * as React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import CssBaseline from '@material-ui/core/CssBaseline'
import importedComponent from 'react-imported-component'
import { Helmet } from 'react-helmet'
import { History } from 'history'
import { Redirect, Route, Switch } from 'react-router-dom'
import { observer, Provider } from 'mobx-react'

import { ApplicationStore } from './common/mobx/application'
import { ChartStore } from './common/mobx/chart'
import { DashboardStore } from './common/mobx/dashboard'

import { ErrorBoundary } from './error-boundary'
import { Navigation } from './navigation'
import { isDevelopment } from './common/environment'

import * as styles from './App.scss'

const AboutPage = importedComponent(async () => (await import('./pages/about-page')).AboutPage)
const ChartPage = importedComponent(async () => (await import('./pages/chart-page')).ChartPage)
const DashboardPage = importedComponent(async () => (await import('./pages/dashboard-page')).DashboardPage)
const MarketListPage = importedComponent(async () => (await import('./pages/market-list-page')).MarketListPage)
const NotFoundPage = importedComponent(async () => (import('./pages/not-found-page')).NotFoundPage)

const stores = {
  applicationStore: new ApplicationStore(),
  chartStore: new ChartStore(),
  dashboardStore: new DashboardStore(),
}

stores.applicationStore.getUser()

const r = (C) => (...props) => <C {...props} />

@observer
class AppComponent extends React.Component {
  renderLoading() {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    )
  }

  renderError(error) {
    return (
      <div className={styles.error}>
        {JSON.stringify(error)}
      </div>
    )
  }

  render() {
    if (stores.applicationStore.userQuery.state === 'initial') {
      return this.renderLoading()
    }

    if (stores.applicationStore.userQuery.state === 'pending') {
      return this.renderLoading()
    }

    if (stores.applicationStore.userQuery.state === 'error') {
      return this.renderError(stores.applicationStore.userQuery.errors)
    }

    if (stores.applicationStore.userQuery.state !== 'completed') {
      return this.renderError(new Error('Unknown State'))
    }

    return (
      <Provider {...stores}>
        <ErrorBoundary>
          <div className={styles.application}>
            <CssBaseline />
            <Helmet defaultTitle="Hello World!">
              <meta charSet="utf-8" />
            </Helmet>
            <Navigation />
            <Switch>
              <Route path="/chart/:chartId" component={r(ChartPage)} />
              <Route path="/dashboard" component={r(DashboardPage)} />
              <Route path="/markets" component={r(MarketListPage)} />
              <Route path="/about" component={r(AboutPage)} />
              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>
              <Route path="/*" component={r(NotFoundPage)} />
            </Switch>
          </div>
        </ErrorBoundary>
      </Provider>
    )
  }
}

export const App = isDevelopment() ? hot(module)(AppComponent) : AppComponent
