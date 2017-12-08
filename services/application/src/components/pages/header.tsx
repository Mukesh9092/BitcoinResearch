import * as React from "react";
import FaChevronLeft from "react-icons/lib/fa/chevron-left";
import Link from "next/link";
import { Component } from "react";
import { Nav, NavItem, NavLink, NavbarBrand } from "reactstrap";

import { Navigation } from "../common/navigation";
import UserNavigationItem from "../common/navigation/UserNavigationItem";

interface INavLinkProps {
  label: string;
  url: string;
  pathname: string;
}

const HeaderNavLink = (props: INavLinkProps) => (
  <NavItem key={props.label}>
    <Link href={props.url} prefetch>
      <NavLink href={props.url} active={props.pathname === props.url}>
        {props.label}
      </NavLink>
    </Link>
  </NavItem>
);

const LeftContent = () => (
  <NavbarBrand key="1" href="/">
    Code9
  </NavbarBrand>
);

interface ICollapseContentProps {
  pathname: string;
}

const CollapseContent = (props: ICollapseContentProps) => (
  <React.Fragment>
    <Nav className="mr-auto" navbar key="links">
      <HeaderNavLink url="/" label="Home" pathname={props.pathname} />
      <HeaderNavLink url="/about" label="About" pathname={props.pathname} />
      <HeaderNavLink url="/contact" label="Contact" pathname={props.pathname} />
    </Nav>

    <Nav className="ml-auto" navbar key="profile-dropdown">
      <UserNavigationItem />
    </Nav>
  </React.Fragment>
);

interface IHeaderProps {
  pathname: string;
}

export const Header = (props: IHeaderProps) => (
  <header>
    <Navigation
      leftContent={<LeftContent pathname={props.pathname} />}
      collapseContent={<CollapseContent />}
      color="inverse"
      inverse
    />
  </header>
);