import { hot } from 'react-hot-loader'
import * as React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Helmet } from 'react-helmet'
import { Route, Switch, withRouter } from 'react-router-dom'
import { observer, Provider } from 'mobx-react'

import AboutPage from '../pages/about-page'
import ChartPage from '../pages/chart-page'
import DashboardPage from '../pages/dashboard-page'
import MarketListPage from '../pages/market-list-page'
import Navigation from '../navigation'
import NotFoundPage from '../pages/not-found-page'
import { ApplicationStore } from '../../stores/application-store'
import { isDevelopment } from '../../common/environment'
import { AsyncComponent } from '../async-component'

import * as styles from './styles.scss'

@withRouter
@observer
class AppComponent extends AsyncComponent {
  constructor(props) {
    super(props)

    this.store = new ApplicationStore()
    this.query = this.store.user.fetch
  }

  componentDidMount() {
    this.store.user.fetch()
  }

  renderPending() {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    )
  }

  renderResolved() {
    return (
      <Provider store={this.store}>
        <div className={styles.application}>
          <CssBaseline />
          <Helmet defaultTitle="Hello World!">
            <meta charSet="utf-8" />
          </Helmet>
          <Navigation />
          <Switch>
            <Route path="/chart/:chartId" component={ChartPage} />
            <Route path="/markets" component={MarketListPage} />
            <Route path="/about" component={AboutPage} />
            <Route exact path="/" component={DashboardPage} />
            <Route path="/*" component={NotFoundPage} />
          </Switch>
        </div>
      </Provider>
    )
  }
}

export const App = isDevelopment() ? hot(module)(AppComponent) : AppComponent
