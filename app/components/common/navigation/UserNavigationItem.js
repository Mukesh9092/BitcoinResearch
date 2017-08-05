import React from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavDropdown
} from "reactstrap";

import Link from "next/link";

export default class Header extends React.Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <NavDropdown isOpen={this.state.isOpen} toggle={this.toggle}>
        <DropdownToggle nav caret>
          Logged Out
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem disabled>Action</DropdownItem>
          <DropdownItem>Another Action</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Another Action</DropdownItem>
        </DropdownMenu>
      </NavDropdown>
    );
  }
}
