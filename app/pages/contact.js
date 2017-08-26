import React from "react";
import { Row, Col } from "reactstrap";

import { ConnectedPage } from "../components/index";
import { Container } from "../components/common/container";
import { Layout } from "../components/pages/public/layout";

export default class PublicContactPage extends React.Component {
  render() {
    return (
      <ConnectedPage>
        <Layout {...this.props}>
          <Container>
            <Row>
              <Col>
                <h1>Contact</h1>
              </Col>
            </Row>
          </Container>
        </Layout>
      </ConnectedPage>
    );
  }
}
