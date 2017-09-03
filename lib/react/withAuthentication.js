import Router from "next/router";
import React, { Component } from "react";

export default ({ isAuthenticated }) => ComposedComponent => {
  return class WithAuthentication extends Component {
    static displayName = `WithAuthentication(${ComposedComponent.displayName})`;
    static propTypes = {};

    static async getInitialProps(ctx) {
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      if (process.browser) {
        if (!isAuthenticated(ctx)) {
          Router.push("/login");
        }
      } else {
        if (!ctx.req.isAuthenticated()) {
          ctx.res.writeHead(302, {
            Location: "/login"
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
