import * as React from "react";
import { Collapse, Nav, Navbar, NavbarToggler } from "reactstrap";
import { Component } from "react";

export interface INavigationState {
  isOpen: boolean;
}

export default class Navigation extends React.Component<any, INavigationState> {
  state = {
    isOpen: false
  };

  toggle = () => {
    // console.log('Navigation#toggle')

    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    // console.log('Navigation#render')

    const { leftContent, collapseContent, ...navbarProps } = this.props;

    let leftContentNav = null;
    if (leftContent) {
      leftContentNav = (
        <Nav className="mr-auto" navbar>
          {leftContent}
        </Nav>
      );
    }

    let collapseNav = null;

    if (collapseContent) {
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
