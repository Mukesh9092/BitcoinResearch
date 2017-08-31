import Router from "next/router";
import React, { Component } from "react";

import isAuthenticated from "./isAuthenticated";

export default ComposedComponent => {
  return class WithAuthentication extends Component {
    static displayName = `WithAuthentication(${ComposedComponent.displayName})`;
    static propTypes = {};

    static async getInitialProps(ctx) {
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      if (process.browser) {
        if (!isAuthenticated()) {
          Router.push("/login");
        }
      } else {
        console.log('##### getInitialProps headers', ctx.req.headers);
        console.log('##### getInitialProps sessionID', ctx.req.sessionID);
        console.log('##### getInitialProps user', ctx.req.user);
        if (!ctx.req.sessionID || !ctx.req.user) {
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
