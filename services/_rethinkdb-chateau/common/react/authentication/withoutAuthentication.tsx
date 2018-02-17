import Router from 'next/router';
import React from 'react';
import { inject, observer } from 'mobx-react';

import { isBrowser } from '../../environment';

export default ({ redirectPath }) => ComposedComponent => {
  @inject('application')
  @observer
  class WithoutAuthentication extends React.Component {
    static displayName = `WithoutAuthentication(${
      ComposedComponent.displayName
    })`;
    static propTypes = {};

    static async getInitialProps(ctx: any) {
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      const { application } = composedInitialProps;

      if (isBrowser()) {
        if (application.session.isAuthenticated(ctx)) {
          Router.push(redirectPath);
        }
      } else {
        if (ctx.req.isAuthenticated()) {
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
  }

  return WithoutAuthentication;
};
