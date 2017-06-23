import React from 'react'
import { Row, Col } from 'reactstrap'
import {
  Provider,
  observer,
} from 'mobx-react'

import { ConnectedPage } from '../components'
import { Container } from '../components/common/container'
import { Layout } from '../components/pages/public/layout'
import { LoginForm } from '../components/pages/public/login/form'

export default class PublicLoginPage extends ConnectedPage {
  renderPageComponent() {
    console.log('PublicLoginPage#renderPageComponent', this.props)

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
