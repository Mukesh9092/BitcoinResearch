import * as React from 'react';
import { Col, Jumbotron, Row } from 'reactstrap';
import { Provider } from 'mobx-react';
import { get } from "lodash";

import sessionStore from '../stores/session';
import userStore from '../stores/user';
import { Container } from '../components/common/container';
import { IGetInitialPropsContext } from '../types/next';
import { IApplicationPageProps } from "../types/application";
import { Layout } from '../components/pages/layout';

export default class PublicIndexPage extends React.Component<IApplicationPageProps, any> {
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
          title="Home"
          pathname={pathname}
        >
          <Container>
            <Row>
              <Col>
                <Jumbotron>
                  <h1 className="display-3">Welcome</h1>
                  <p className="lead">
                    This should be a dashboard in the future.
                  </p>
                </Jumbotron>
              </Col>
            </Row>
          </Container>
        </Layout>
      </Provider>
    );
  }
}
