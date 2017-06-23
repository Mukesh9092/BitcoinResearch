import React from 'react'
import { Row, Col } from 'reactstrap'
import {
  Provider,
  observer,
} from 'mobx-react'

import { Container } from '../components/common/container'
import { Layout } from '../components/pages/public/layout'
import { LoginForm } from '../components/pages/public/login/form'

import sessionStore from '../stores/session'

@observer
export default class PublicLoginPage extends React.Component {
  render() {
    console.log('PublicLoginPage#render', this.props)

    return (
      <Provider sessionStore={sessionStore}>
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
      </Provider>
    )
  }
}
