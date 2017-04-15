import React from 'react'

import Layout from '../components/layout'

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    return req
      ? { userAgent: req.headers['user-agent'] }
      : { userAgent: navigator.userAgent }
  }

  render () {
    return (
      <Layout>
        Hello World {this.props.userAgent}
      </Layout>
    )
  }
}
