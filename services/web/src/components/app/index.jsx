import React from 'react';
import { Button } from '@blueprintjs/core';
import { History } from 'history';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { incrementCounter, decrementCounter } from '../../actions/counter';
import { Navigation } from '../navigation';

import { About } from '../pages/about';
import { Home } from '../pages/home';

import * as styles from './styles';

const Application = props => (
  <React.Fragment>
    <Navigation history={props.history} />
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </React.Fragment>
);

export const App = connect(
  (state, ownProps) => ({
    history: ownProps.history,
    count: state.counter.count,
  }),
  dispatch => ({
    increment: () => {
      dispatch(incrementCounter());
    },
    decrement: () => {
      dispatch(decrementCounter());
    },
  }),
)(Application);
