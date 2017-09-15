import Router from "next/router";
import React, { Component } from "react";

export default ({ isAuthenticated, redirectPath }) => ComposedComponent => {
  return class WithoutAuthentication extends Component {
    static displayName = `WithoutAuthentication(${ComposedComponent.displayName})`;
    static propTypes = {};

    static async getInitialProps(ctx) {
      console.log('WithoutAuthentication#getInitialProps')

      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      if (process.browser) {
        console.log('WithoutAuthentication#getInitialProps browser')

        if (isAuthenticated(ctx)) {
          console.log('WithoutAuthentication#getInitialProps user is authenticated, redirecting')

          Router.push(redirectPath);
        }
      } else {
        console.log('WithoutAuthentication#getInitialProps server')

        if (ctx.req.isAuthenticated()) {
          console.log('WithoutAuthentication#getInitialProps user is authenticated, redirecting')

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
