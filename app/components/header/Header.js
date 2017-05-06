import React from 'react'
import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from 'reactstrap'

import Link from 'next/link'

import UserNavigationItem from './UserNavigationItem'

export default class Header extends React.Component {
  state = {
    isOpen: false,
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    return (
      <header>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">App</NavbarBrand>

          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link href="/">
                  <NavLink href="/">Dashboard</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/users">
                  <NavLink href="/users">Users</NavLink>
                </Link>
              </NavItem>
            </Nav>

            <Nav className="ml-auto" navbar>
              <UserNavigationItem />
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    )
  }
}
