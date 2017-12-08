import { Component } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavDropdown,
  NavItem,
  NavLink
} from "reactstrap";
import { observer, inject } from "mobx-react";

import Link from "next/link";

@inject("application")
@observer
export default class UserNavigationItem extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { application } = this.props;

    // console.log("UserNavigationItem#render", this.props);

    if (
      application &&
      application.session &&
      application.session.isAuthenticated()
    ) {
      return (
        <NavDropdown isOpen={this.state.isOpen} toggle={this.toggle}>
          <DropdownToggle nav caret>
            Logged In
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <Link href="/cms" prefetch>
                <a href="/cms">CMS</a>
              </Link>
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                application.session.logout();
              }}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </NavDropdown>
      );
    }

    return (
      <NavItem key="login">
        <Link href="/login" prefetch>
          <NavLink href="/login">Login</NavLink>
        </Link>
      </NavItem>
    );
  }
}
