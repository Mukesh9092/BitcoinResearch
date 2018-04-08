import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { ApolloProvider } from 'react-apollo';
import { App } from './components/app';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { getBrowserApolloClient } from '../common/apollo-client';
import { log } from '../common/log';

const history = createHistory();
const apolloClient = getBrowserApolloClient();

const render = (AppComponent) => {
  ReactDOM.hydrate(
    <AppContainer>
      <ApolloProvider client={apolloClient}>
        <Router history={history}>
          <AppComponent history={history} />
        </Router>
      </ApolloProvider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

if (process.env.NODE_ENV === 'development' && module.hot) {
  log.setLevel('debug');
  module.hot.accept('./components/app', () => {
    const { App: NewApp } = require('./components/app');

    render(NewApp);
  });
}

render(App);
