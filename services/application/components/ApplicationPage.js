import React from "react";
import Router from "next/router";

import { Application } from "../stores/application";

export default class ApplicationPage extends React.Component {
  constructor(props) {
    console.log("ApplicationPage#constructor");

    super(props);

    if (process.browser) {
      this.application = Application.getBrowserInstance(props.application);
    } else {
      this.application = props.application;
    }
  }

  static ensureAuthenticated(ctx, application) {
    console.log("ApplicationPage#ensureAuthenticated");

    if (process.browser) {
      console.log(
        "ApplicationPage#ensureAuthenticated browser isAuthenticated",
        application.session.isAuthenticated()
      );

      if (!application.session.isAuthenticated()) {
        Router.push("/login");
      }
    } else {
      console.log("ApplicationPage#ensureAuthenticated server", ctx.req.user);

      if (!ctx.req.user) {
        ctx.res.writeHead(302, {
          Location: "/login"
        });
        ctx.res.end();
      }
    }
  }

  static ensureUnauthenticated(ctx, application) {
    console.log("ApplicationPage#ensureUnauthenticated");

    if (process.browser) {
      console.log(
        "ApplicationPage#ensureAuthenticated browser isAuthenticated",
        application.session.isAuthenticated()
      );

      if (application.session.isAuthenticated()) {
        Router.push("/cms");
      }
    } else {
      console.log("ApplicationPage#ensureUnauthenticated server", ctx.req.user);

      if (!!ctx.req.user) {
        ctx.res.writeHead(302, {
          Location: "/cms"
        });
        ctx.res.end();
      }
    }
  }

  static async getInitialProps(ctx) {
    console.log("ApplicationPage#getInitialProps");

    let application;
    if (process.browser) {
      application = Application.getBrowserInstance(ctx);

      return {
        application
      };
    } else {
      application = await Application.getServerInstance(ctx);

      return {
        application,
        serverState: {
          application
        }
      };
    }
  }
}
