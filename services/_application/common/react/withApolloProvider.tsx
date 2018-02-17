import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider, getDataFromTree } from 'react-apollo';

import createApolloClient from './createApolloClient';

import { isBrowser } from '../environment';

interface WithApolloProviderProps {
  serverState: any;
}

export default ComposedComponent => {
  return class WithApolloProvider extends React.Component<
    WithApolloProviderProps,
    any
  > {
    static async getInitialProps(ctx: any) {
      let serverState = {};

      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      if (!isBrowser()) {
        const apollo = createApolloClient();
        const url = {
          query: ctx.query,
          pathname: ctx.pathname,
        };

        const app = (
          <ApolloProvider client={apollo}>
            <ComposedComponent url={url} {...composedInitialProps} />
          </ApolloProvider>
        );
        await getDataFromTree(app);

        const state = apollo.getInitialState();

        serverState = {
          apollo: {
            data: state.data,
          },
        };
      }

      return {
        serverState,
        ...composedInitialProps,
      };
    }

    constructor(props: WithApolloProviderProps) {
      super(props);
      this.apollo = createApolloClient(this.props.serverState);
    }

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  };
};
