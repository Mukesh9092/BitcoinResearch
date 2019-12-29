import { NextPage } from 'next'
import React from 'react'
import styled from 'styled-components'
import App from '../components/App'
import { PageContext } from '../domain/PageContext'
import { useAuthentication } from '../hooks/authentication'

const Container = styled.main`
  margin-top: 50px;
  padding: 15px;
`

const Page: NextPage = (props) => {
  const authentication = useAuthentication()
  // const dashboard = useDashboard({ userId: authentication.user.id })

  return (
    <App>
      <Container>
        <h1>Dashboard</h1>
      </Container>
    </App>
  )
}

Page.getInitialProps = async (context: PageContext) => {
  console.log('DashboardPage#getInitialProps')

  console.log('DashboardPage#getInitialProps:authentication', context.authentication)

  return {}
}

export default Page
