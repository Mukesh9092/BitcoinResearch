import React from 'react'
import { Row, Col } from 'reactstrap'

import withData from '../lib/withData'
import { Container } from '../components/common/container'
import { Layout } from '../components/pages/public/layout'
import { LoginForm } from '../components/pages/public/login/form'


@withData
export default class PublicIndexPage extends React.Component {
  render() {
    return (
      <Layout {...this.props}>
        <Container>
          <Row>
            <Col>
              <h1>Login</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <LoginForm />
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}
