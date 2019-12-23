import { Alignment, Button, Navbar } from '@blueprintjs/core'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react'

// TODO: Extract from here
export interface UserInfo {
  email: string
  email_verified: boolean
  family_name: string
  given_name: string
  name: string
  preferred_username: string
  sub: string
}

export interface NavBarProps {
  heading: string
}

export interface NavBarState {
  userInfo: UserInfo | null
}

const NavBar = (props: NavBarProps) => {
  // const { keycloak } = useKeycloak()
  // const { authenticated } = keycloak

  const authenticated = false

  return (
    <Navbar fixedToTop={true}>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>{props.heading}</Navbar.Heading>
        <Navbar.Divider />
        <Link href='/'>
          <Button className='bp3-minimal' icon='home' text='Home' />
        </Link>
        <Link href='/assets'>
          <Button className='bp3-minimal' icon='briefcase' text='Assets' />
        </Link>
        <Link href='/about'>
          <Button className='bp3-minimal' icon='help' text='About' />
        </Link>
        {authenticated ? (
          <>
            <Navbar.Divider />
            <Link href='/dashboard'>
              <Button
                className='bp3-minimal'
                icon='dashboard'
                text='Dashboard'
              />
            </Link>
          </>
        ) : null}
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        {authenticated ? (
          <Button
            className='bp3-minimal'
            icon='log-out'
            text='Sign Out'
            onClick={() => {
              console.log('Sign Out')
            }}
          />
        ) : (
          <Button
            className='bp3-minimal'
            icon='log-in'
            text='Sign In'
            onClick={() => {
              Router.push('/signin')
            }}
          />
          // <Link href='/signin'>
          //   <Button className='bp3-minimal' icon='log-in' text='Sign In' />
          // </Link>
        )}
      </Navbar.Group>
    </Navbar>
  )
}

export default NavBar
