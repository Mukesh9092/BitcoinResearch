import React from 'react';
import { Button } from '@blueprintjs/core';
import { History } from 'history';
import { connect } from 'react-redux';

import {
  incrementCounter,
  decrementCounter,
} from '../../../actions/counter.ts';

import * as styles from './styles';

interface Props {
  history: History;
  count: number;

  increment: Function;
  decrement: Function;
}

export const Home = connect(
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
)(({ count, increment, decrement }: Props) => (
  <React.Fragment>
    <div className={styles.container}>
      <h1>Home!</h1>
      <div className={styles.counter}>{count}</div>
      <Button
        onClick={() => {
          increment();
        }}
      >
        +
      </Button>
      <Button
        onClick={() => {
          decrement();
        }}
      >
        -
      </Button>
    </div>
  </React.Fragment>
));
