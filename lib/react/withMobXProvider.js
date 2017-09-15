import React from "react";
import PropTypes from "prop-types";
import { Provider } from "mobx-react";

export default options => ComposedComponent => {
  return class WithMobXProvider extends React.Component {
    static displayName = `WithMobXProvider(${ComposedComponent.displayName})`;
    static propTypes = {
      serverState: PropTypes.object.isRequired
    };

    static async getInitialProps(ctx) {
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      return composedInitialProps;
    }

    render() {
      return (
        <Provider {...options}>
          <ComposedComponent {...this.props} />
        </Provider>
      );
    }
  };
};
