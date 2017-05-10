import FaChevronLeft from 'react-icons/lib/fa/chevron-left'
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
    <NavItem>
      <Link href="/" prefetch>
        <NavLink href="/">
          <FaChevronLeft
            style={{
              marginRight: 10,
            }}
          />
        </NavLink>
      </Link>
    </NavItem>,
  ])

  renderCollapseContent = () => ([
    <Nav className="mr-auto" navbar key="links">
      {this.renderNavLink('/cms', 'Dashboard')}
      {this.renderNavLink('/cms/users', 'Users')}
    </Nav>,

    <Nav className="ml-auto" navbar key="profile-button">
      <UserNavigationItem />
    </Nav>,
  ])

  render() {
    return (
      <header>
        <Navigation
          inverse
          light
          color="primary"
          leftContent={this.renderLeftContent()}
          collapseContent={this.renderCollapseContent()}
        />
      </header>
    )
  }
}
