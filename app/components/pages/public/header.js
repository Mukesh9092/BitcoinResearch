import Link from 'next/link'
import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'

import { Navigation } from '../../common/navigation/index'
import UserNavigationItem from '../../common/navigation/UserNavigationItem'

export class Header extends React.Component {
  renderNavLink = (url, label) => {
    const { pathname } = this.props

    return (
      <NavItem>
        <Link href={url}>
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

  renderLeftContent = () => ([])

  renderCollapseContent = () => ([
    <Nav className="mr-auto" navbar key="links">
      {this.renderNavLink('/', 'Home')}
      {this.renderNavLink('/about', 'About')}
      {this.renderNavLink('/contact', 'Contact')}
      {this.renderNavLink('/cms', 'CMS')}
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
