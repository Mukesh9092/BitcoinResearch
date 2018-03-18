import React from 'react';
import { Button } from '@blueprintjs/core';
import { History } from 'history';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { incrementCounter, decrementCounter } from '../../actions/counter.ts';
import { Navigation } from '../navigation';

import { About } from '../pages/about';
import { Home } from '../pages/home';

import * as styles from './styles';

interface Props {
  history: History;
  count: number;

  increment: Function;
  decrement: Function;
}

const Application = (props: Props) => (
  <React.Fragment>
    <Navigation history={props.history} />
    <Route exact={true} path="/" component={Home} />
    <Route path="/about" component={About} />
  </React.Fragment>
);

export const App = connect(
  (state: { counter: { count: number } }, ownProps: { history: History }) => ({
    history: ownProps.history,
    count: state.counter.count,
  }),
  dispatch => {
    return {
      increment: () => {
        dispatch(incrementCounter());
      },
      decrement: () => {
        dispatch(decrementCounter());
      },
    };
  },
)(Application);
