import React from 'react'
import { Row, Col } from 'reactstrap'

import { Container } from '../../components/common/container'
import { Layout } from '../../components/pages/cms/layout'

export default class CMSUsersPage extends React.Component {
  render() {
    return (
      <Layout {...this.props}>
        <Container>
          <Row>
            <Col>
              Users
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}
