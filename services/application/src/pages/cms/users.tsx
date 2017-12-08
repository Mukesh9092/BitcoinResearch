import React from "react";
import { Provider } from "mobx-react";
import { Row, Col } from "reactstrap";

import ApplicationPage from "../../components/ApplicationPage";
import { Application } from "../../stores/application";
import { Container } from "../../components/common/container";
import { Layout } from "../../components/pages/cms/layout";

class CMSUsersPage extends ApplicationPage {
  static async getInitialProps(ctx) {
    const initialProps = await super.getInitialProps(ctx);

    this.ensureAuthenticated(ctx, initialProps.application);

    return initialProps;
  }

  render() {
    return (
      <Provider application={this.application || this.props.application}>
        <Layout {...this.props}>
          <Container>
            <Row>
              <Col>Users</Col>
            </Row>
          </Container>
        </Layout>
      </Provider>
    );
  }
}

export default CMSUsersPage;
