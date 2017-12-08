import React from "react";
import { Provider } from "mobx-react";
import { Row, Col } from "reactstrap";

import ApplicationPage from "../components/ApplicationPage";
import { Application } from "../stores/application";
import { Container } from "../components/common/container";
import { Layout } from "../components/pages/layout";

export default class PublicContactPage extends ApplicationPage {
  render() {
    return (
      <Provider application={this.application || this.props.application}>
        <Layout {...this.props}>
          <Container>
            <Row>
              <Col>
                <h1>Contact</h1>
              </Col>
            </Row>
          </Container>
        </Layout>
      </Provider>
    );
  }
}
