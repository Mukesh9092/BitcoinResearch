import * as React from "react";
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

import { SessionStore } from "../../../stores/session";

interface IUserNavigationItemProps {
  sessionStore: SessionStore
}

interface IUserNavigationItemState {
  isOpen: boolean;
}

@inject("sessionStore")
@observer
export default class UserNavigationItem extends React.Component<IUserNavigationItemProps, IUserNavigationItemState> {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { sessionStore } = this.props;

    // console.log("UserNavigationItem#render", this.props);

    if (sessionStore.isAuthenticated) {
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
                sessionStore.logout();
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
