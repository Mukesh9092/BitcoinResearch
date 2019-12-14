import { Alignment, Button, Navbar } from '@blueprintjs/core'
import Link from 'next/link'
import React from 'react'
import { signIn, signOut } from '../helpers/authentication'

export interface NavBarProps {
  heading: string
}

const NavBar = (props: NavBarProps) => {
  // const authentication = useAuthentication()
  const authentication = { user: null }

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
        {authentication.user ? (
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
        {authentication.user ? (
          <Button
            className='bp3-minimal'
            icon='log-out'
            text='Sign Out'
            onClick={signOut}
          />
        ) : (
          <Button
            className='bp3-minimal'
            icon='log-in'
            text='Sign In'
            onClick={signIn}
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
