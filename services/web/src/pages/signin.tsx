import { NextPage } from 'next'
import React from 'react'
import styled from 'styled-components'
import App from '../components/App'
import SignInForm from '../components/SignInForm'

const Container = styled.main`
  margin-top: 50px;
  padding: 15px;
`

const Page: NextPage = () => {
  return (
    <App>
      <Container>
        <h1>Sign In</h1>

        <SignInForm />
      </Container>
    </App>
  )
}

export default Page
