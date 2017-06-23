import React from 'react'
import { Row, Col } from 'reactstrap'

import { ConnectedPage } from '../../components'
import { Container } from '../../components/common/container'
import { Layout } from '../../components/pages/cms/layout'

export default class CMSUsersPage extends ConnectedPage {
  renderPageComponent() {
    console.log('CMSUsersPage#renderPageComponent', this.props)

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
