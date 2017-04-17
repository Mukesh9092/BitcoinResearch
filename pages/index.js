import React from 'react'

import log from '../lib/log'

import Header from '../components/header'
import Footer from '../components/footer'
import Layout from '../components/layout'

export default (props) => {
  log.debug('pages/index.js render', props)

  const {
    url: {
      pathname,
    }
  } = props

  return (
    <Layout>
      <Header />
      <p>Hello, World!</p>
      <Footer />
    </Layout>
  )
}
