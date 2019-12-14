import { NextPage } from 'next'
import Router from 'next/router'
import React from 'react'
import styled from 'styled-components'
import App from '../components/App'
import { authenticationInitialProps, useAuthentication } from '../helpers/authentication'

const Container = styled.main`
  margin-top: 50px;
  padding: 15px;
`

const Page: NextPage = () => {
  if (typeof window !== 'undefined') {
    const authentication = useAuthentication()
    if (!authentication.user) {
      Router.push('/').catch(console.error)
      return null
    }
  }

  return (
    <App>
      <Container>
        <h1>Dashboard</h1>
      </Container>
    </App>
  )
}

Page.getInitialProps = async (context) => {
  const authentication = authenticationInitialProps(context)

  if (context.res) {
    if (!authentication.user) {
      context.res.writeHead(302, {
        Location: '/',
      })
      context.res.end()
    }
  }

  return {}
}

export default Page
