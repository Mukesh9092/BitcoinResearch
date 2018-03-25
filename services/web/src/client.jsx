import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { ApolloProvider } from 'react-apollo';
import { App } from './components/app';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import apolloClient from './apollo-client';
import store from './store';

const history = createHistory();

const render = (AppComponent) => {
  ReactDOM.hydrate(
    <AppContainer>
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <Router history={history}>
            <AppComponent history={history} />
          </Router>
        </Provider>
      </ApolloProvider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./components/app', () => {
    const { App: NewApp } = require('./components/app');

    render(NewApp);
  });
}

render(App);
