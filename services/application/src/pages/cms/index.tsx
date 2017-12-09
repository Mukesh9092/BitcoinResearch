import * as React from "react";
import { Provider } from "mobx-react";
import { Row, Col } from "reactstrap";
import { observer } from "mobx-react";

import ApplicationPage from "../../components/ApplicationPage";
import { Application } from "../../stores/application";
import { Container } from "../../components/common/container";
import { Layout } from "../../components/pages/cms/layout";

class CMSIndexPage extends ApplicationPage {
  static async getInitialProps(ctx) {
    const initialProps = await super.getInitialProps(ctx);

    // console.log("initialProps", initialProps);

    this.ensureAuthenticated(ctx, initialProps.application);

    return initialProps;
  }

  render() {
    return (
      <Provider application={this.application || this.props.application}>
        <Layout {...this.props}>
          <Container>
            <Row>
              <Col>CMS INDEX 123</Col>
            </Row>
          </Container>
        </Layout>
      </Provider>
    );
  }
}

export default CMSIndexPage;
