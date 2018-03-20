import React from 'react';
import gql from 'graphql-tag';
import { Button } from '@blueprintjs/core';
import { History } from 'history';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import {
  incrementCounter,
  decrementCounter,
} from '../../../actions/counter.ts';

import * as styles from './styles';

interface Props {
  count: number;

  query: {
    currencyPairs: [
      {
        id: string;
        key: string;
        currencyAKey: string;
        currencyAName: string;
        currencyATxFee: string;
        currencyAMinConf: string;
        currencyBKey: string;
        currencyBName: string;
        currencyBTxFee: string;
        currencyBMinConf: string;
        currencyA24HVolume: string;
        currencyB24HVolume: string;
      }
    ];
  };

  increment: Function;
  decrement: Function;
}

const MY_QUERY = gql`
  query {
    currencyPairs {
      id
      key
      currencyAKey
      currencyAName
      currencyATxFee
      currencyAMinConf
      currencyBKey
      currencyBName
      currencyBTxFee
      currencyBMinConf
      currencyA24HVolume
      currencyB24HVolume
    }
  }
`;

const MyComponentWithData = graphql(MY_QUERY)(props => <div>...</div>);

const HomeComponent = ({ count, increment, decrement }: Props) => (
  <React.Fragment>
    <div className={styles.container}>
      <h1>123</h1>
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
);

const withConnect = connect(
  (state: { counter: { count: number } }, ownProps) => {
    console.log('CONNECT OWNPROPS', ownProps);

    return {
      ...ownProps,
      count: state.counter.count,
    };
  },
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
);
const withGraphQL = graphql(MY_QUERY, {
  options: props => {
    console.log('GRAPHQL OPTIONS PROPS', props);
    return {
      ...props,
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    };
  },
  props: ({ ownProps, mutate }) => {
    console.log('GRAPHQL PROPS OWNPROPS', ownProps, arguments);
    return {
      ...ownProps,
    };
  },
});

export const Home = withGraphQL(withConnect(HomeComponent));
