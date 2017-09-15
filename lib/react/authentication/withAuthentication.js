import Router from "next/router";
import React, { Component } from "react";

export default ({ isAuthenticated, redirectPath }) => ComposedComponent => {
  return class WithAuthentication extends Component {
    static displayName = `WithAuthentication(${ComposedComponent.displayName})`;
    static propTypes = {};

    static async getInitialProps(ctx) {
      console.log('WithAuthentication#getInitialProps')

      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      if (process.browser) {
        console.log('WithAuthentication#getInitialProps browser')

        if (!isAuthenticated(ctx)) {
          console.log('WithAuthentication#getInitialProps user is not authenticated, redirecting')

          Router.push(redirectPath);
        }
      } else {
        console.log('WithAuthentication#getInitialProps server')

        if (!ctx.req.isAuthenticated()) {
          console.log('WithAuthentication#getInitialProps user is not authenticated, redirecting')

          ctx.res.writeHead(302, {
            Location: redirectPath,
          });
          ctx.res.end();
        }
      }

      return {
        ...composedInitialProps,
      };
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  };
};
