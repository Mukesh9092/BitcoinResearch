import * as React from "react";
import { FaChevronLeft } from "react-icons/lib/fa";
import Link from "next/link";
import { Nav, NavItem, NavLink, NavbarBrand } from "reactstrap";

import { Navigation } from "../../common/navigation";
import UserNavigationItem from "../../common/navigation/UserNavigationItem";

interface INavLinkProps {
  label: string;
  url: string;
  pathname: string;
}

const HeaderNavLink = (props: INavLinkProps) => {
  // console.log('HeaderNavLink');

  return (
    <NavItem key={props.url}>
      <Link href={props.url} prefetch>
        <NavLink href={props.url} active={props.pathname === props.url}>
          {props.label}
        </NavLink>
      </Link>
    </NavItem>
  );
};

interface ILeftContentProps {
  pathname: string;
}

const LeftContent = (props: ILeftContentProps) => {
  // console.log('LeftContent');

  return (
    <NavItem key="left">
      <Link href="/" prefetch>
        <NavLink href="/">
          <FaChevronLeft
            style={{
              marginRight: 10
            }}
          />
        </NavLink>
      </Link>
    </NavItem>
  );
};

interface ICollapseContentProps {
  pathname: string;
}

const CollapseContent = (props: ICollapseContentProps) => {
  // console.log('CollapseContent', props);

  return (
    <React.Fragment>
      <Nav className="mr-auto" navbar key="links">
        <HeaderNavLink url="/cms" label="Dashboard" pathname={props.pathname} />
        <HeaderNavLink url="/cms/currencies" label="Currencies" pathname={props.pathname} />
        <HeaderNavLink url="/cms/users" label="Users" pathname={props.pathname} />
      </Nav>

      <Nav className="ml-auto" navbar key="profile-dropdown">
        <UserNavigationItem />
      </Nav>
    </React.Fragment>
  );
};

interface IHeaderProps {
  pathname: string;
}

export const Header = (props: IHeaderProps) => {
  // console.log('Header', props);

  return (
    <header>
      <Navigation
        leftContent={<LeftContent pathname={props.pathname} />}
        collapseContent={<CollapseContent pathname={props.pathname} />}
        color="primary"
        inverse
        light
      />
    </header>
  );
};