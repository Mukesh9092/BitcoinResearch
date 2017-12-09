import Router from "next/router";
import * as React from "react";
import { inject, observer } from "mobx-react";

import { isBrowser } from "../../environment";

export default function withAuthentication({
  redirectPath
}: {
  redirectPath: string
}) {
  return (ComposedComponent: React.Component) => {
    @inject("application")
    @observer
    class WithAuthentication extends React.Component {
      static displayName = `WithAuthentication(${ComposedComponent.displayName})`;
      static propTypes = {};

      static async getInitialProps(ctx: {
        req: {
          isAuthenticated: Function
        },
        res: {
          writeHead: Function,
          end: Function
        }
      }) {
        // console.log("WithAuthentication#getInitialProps");

        let composedInitialProps = {};
        if (ComposedComponent.getInitialProps) {
          composedInitialProps = await ComposedComponent.getInitialProps(ctx);
        }

        const { application } = composedInitialProps;

        if (isBrowser()) {
          // console.log("WithAuthentication#getInitialProps browser", this.props);

          if (!application.session.isAuthenticated(ctx)) {
            // console.log("WithAuthentication#getInitialProps user is not authenticated, redirecting");

            Router.push(redirectPath);
          }
        } else if (!ctx.req.isAuthenticated()) {
          // console.log("WithAuthentication#getInitialProps user is not authenticated, redirecting");

          ctx.res.writeHead(302, {
            Location: redirectPath
          });
          ctx.res.end();
        }

        return {
          ...composedInitialProps
        };
      }

      render() {
        // console.log("WithAuthentication#render", this.props);

        return <ComposedComponent {...this.props} />;
      }
    }

    return WithAuthentication;
  };
}
