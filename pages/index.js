import React from 'react'

import Layout from '../components/layout'

export default () => (
  <Layout>
    Hello world
    <p>scoped!</p>
    <style jsx>{`
      p {
        color: blue;
      }
      div {
        background: #99CCFF;
      }
    `}</style>
  </Layout>
)
