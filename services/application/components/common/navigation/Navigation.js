import { Collapse, Nav, Navbar, NavbarToggler } from "reactstrap";
import React from "react";

export default class Navigation extends React.Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { leftContent, collapseContent, ...navbarProps } = this.props;

    let leftContentNav = null;
    if (leftContent && leftContent.length) {
      leftContentNav = (
        <Nav className="mr-auto" navbar>
          {leftContent}
        </Nav>
      );
    }

    let collapseNav = null;

    if (collapseContent && collapseContent.length) {
      collapseNav = (
        <Collapse isOpen={this.state.isOpen} navbar>
          {collapseContent}
        </Collapse>
      );
    }

    return (
      <Navbar toggleable {...navbarProps}>
        <NavbarToggler right onClick={this.toggle} />

        {leftContentNav}
        {collapseNav}
      </Navbar>
    );
  }
}
