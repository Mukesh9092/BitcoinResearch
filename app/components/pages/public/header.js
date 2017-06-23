import FaChevronLeft from 'react-icons/lib/fa/chevron-left'
import Link from 'next/link'
import React from 'react'
import { Nav, NavItem, NavLink, NavbarBrand } from 'reactstrap'

import { Navigation } from '../../common/navigation/index'
import UserNavigationItem from '../../common/navigation/UserNavigationItem'

export class Header extends React.Component {
  renderNavLink = (url, label) => {
    const { pathname } = this.props

    return (
      <NavItem key={label}>
        <Link href={url} prefetch>
          <NavLink
            href={url}
            active={pathname === url}
          >
            {label}
          </NavLink>
        </Link>
      </NavItem>
    )
  }

  renderLeftContent = () => ([
    <NavbarBrand key="1" href="/">Code9</NavbarBrand>,
  ])

  renderCollapseContent = () => ([
    <Nav className="mr-auto" navbar key="links">
      {this.renderNavLink('/', 'Home')}
      {this.renderNavLink('/about', 'About')}
      {this.renderNavLink('/contact', 'Contact')}
      {this.renderNavLink('/login', 'Login')}
      {this.renderNavLink('/cms', 'Dashboard')}
      {this.renderNavLink('/cms/users', 'Users')}
    </Nav>,

    <Nav className="ml-auto" navbar key="profile-dropdown">
      <UserNavigationItem />
    </Nav>,
  ])

  render() {
    return (
      <header>
        <Navigation
          inverse
          color="inverse"
          leftContent={this.renderLeftContent()}
          collapseContent={this.renderCollapseContent()}
        />
      </header>
    )
  }
}
