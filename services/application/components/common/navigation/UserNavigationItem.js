import React from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavDropdown,
  NavItem,
  NavLink,
} from "reactstrap";

import Link from "next/link";

import sessionStore from '../../../stores/session';

export default class UserNavigationItem extends React.Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    if (!sessionStore.isAuthenticated()) {
      return (
        <NavItem key="login">
          <Link href="/login" prefetch>
            <NavLink href="/login">
              Login
            </NavLink>
          </Link>
        </NavItem>
      );
    }

    return (
      <NavDropdown isOpen={this.state.isOpen} toggle={this.toggle}>
        <DropdownToggle nav caret>
          Logged In
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            <Link href="/cms" prefetch>
              CMS
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </NavDropdown>
    );
  }
}
