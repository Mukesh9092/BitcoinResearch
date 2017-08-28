import Router from "next/router";
import React, { Component } from "react";

import isAuthenticated from "./isAuthenticated";

export default ComposedComponent => {
  return class WithAuthentication extends Component {
    static displayName = `WithAuthentication(${ComposedComponent.displayName})`;
    static propTypes = {};

    static async getInitialProps(ctx) {
      if (process.browser) {
        if (!isAuthenticated()) {
          Router.push("/login");
        }
        return;
      }

      if (!ctx.req.sessionID || !ctx.req.user) {
        ctx.res.writeHead(302, {
          Location: "/login"
        });
        ctx.res.end();
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  };
};
