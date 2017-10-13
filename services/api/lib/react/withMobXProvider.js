import PropTypes from "prop-types";
import React from "react";
import { Provider } from "mobx-react";
import { get } from "lodash";

export default Application => ComposedComponent => {
  return class WithMobXProvider extends React.Component {
    static displayName = `WithMobXProvider(${ComposedComponent.displayName})`;
    static propTypes = {
      serverState: PropTypes.object.isRequired
    };

    static async getInitialProps(ctx) {
      console.log("WithMobXProvider#getInitialProps");

      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      let application;
      let serverState = {};

      if (process.browser) {
        // Set the application for route changes.
        application = Application.getBrowserInstance(ctx);

        // Set the application instance for the browser side from here.
        this.application = application;
      } else {
        application = await Application.getServerInstance(ctx);

        // Set the application instance for the server side from here.
        this.application = application;

        // Also return it so it gets transformed into JSON for the initial data
        // on the browser side.
        serverState.application = application;
      }

      return {
        application,
        serverState,
        ...composedInitialProps
      };
    }

    constructor(props) {
      super(props);

      console.log("WithMobXProvider#constructor");

      // Se the application for the first browser render.
      if (process.browser && !this.application) {
        const application = get(props, "serverState.application");

        // Set the application instance for the browser side from here.
        this.application = Application.getBrowserInstance(application);
      }
    }

    render() {
      console.log("WithMobXProvider#render", this.props, this.application);

      return (
        <Provider application={this.application}>
          <ComposedComponent {...this.props} />
        </Provider>
      );
    }
  };
};
