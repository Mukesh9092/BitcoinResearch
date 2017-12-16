import * as React from "react";
import { Provider } from "mobx-react";
import { Row, Col, Jumbotron, Button } from "reactstrap";

import sessionStore from '../../stores/session';
import userStore from '../../stores/user';
import { Container } from "../../components/common/container";
import { IApplicationPageProps } from "../../types/application";
import { IGetInitialPropsContext } from '../../types/next';
import { Layout } from "../../components/pages/cms/layout";

export default class CMSIndexPage extends React.Component<IApplicationPageProps, any> {
  // TODO: ensureAuthenticated
  static async getInitialProps(ctx: IGetInitialPropsContext) {
    const { err, req, res, pathname, query, asPath } = ctx;

    if (err) {
      throw err;
    }

    sessionStore.loadFromContext(ctx);

    return {
      sessionStore,
      userStore,
      pathname,
      query,
      asPath,
    };
  }

  render() {
    const {
      pathname,
    } = this.props;

    return (
      <Provider
        sessionStore={sessionStore}
        userStore={userStore}
      >
        <Layout
          title="CMS / Dashboard"
          pathname={pathname}
        >
          <Container>
            <Row>
              <Col>
                <h1>Dashboard</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                Si!
              </Col>
            </Row>
          </Container>
        </Layout>
      </Provider>
    );
  }
}
