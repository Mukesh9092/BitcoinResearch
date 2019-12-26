import { NextPage } from 'next'
import React from 'react'
import styled from 'styled-components'
import App from '../components/App'

const Container = styled.main`
  margin-top: 50px;
  padding: 15px;
`

const Page: NextPage = () => {
  // if (typeof window !== 'undefined') {
  //   const authentication = useAuthentication()
  //   if (!authentication.user) {
  //     Router.push('/').catch(console.error)
  //     return null
  //   }
  // }

  return (
    <App>
      <Container>
        <h1>Dashboard</h1>
      </Container>
    </App>
  )
}

Page.getInitialProps = async (context) => {
  if (context.req) {
    // @ts-ignore
    const authenticated: boolean = context.req.isAuthenticated()

    if (!authenticated) {
      context.res.writeHead(302, {
        Location: '/signin',
      })
      context.res.end()
    }
  }

  return {}
}

export default Page
