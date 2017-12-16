import * as React from "react";

import FaList from "react-icons/lib/fa/list";
import FaCog from "react-icons/lib/fa/cog";
import Link from "next/link";

import {
  Button,
  ButtonGroup,
  ButtonDropdown,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import { Navigation } from "../../../../components/common/navigation";

interface IToolbarNavLinkProps {
  pathname: string;
  url: string;
  label: string;
}

const ToolbarNavLink = (props: IToolbarNavLinkProps) => {
  const {
    pathname,
    url,
    label,
  } = props;

  return (
    <NavItem key={url}>
      <Link href={url} prefetch>
        <NavLink href={url} active={pathname === url}>
          {label}
        </NavLink>
      </Link>
    </NavItem>
  );
};

const periodOptions = [
  {
    label: "5m",
    value: 300
  },

  {
    label: "15m",
    value: 900
  },

  {
    label: "30m",
    value: 1800
  },

  {
    label: "2h",
    value: 7200
  },

  {
    label: "4h",
    value: 14400
  },

  {
    label: "24h",
    value: 86400
  }
];

interface IToolbarProps {
  currencyA: string;
  currencyB: string;
  currencyPair: string;
  period: number;
  start: number;
  end: number;

  handlePeriodChange: (event: React.MouseEvent<any>) => void;
}

interface IToolbarState {
  selectedPeriod: number;

  periodDropdownIsOpen: boolean;
  zoomDropdownIsOpen: boolean;
}

export default class Toolbar extends React.Component<IToolbarProps, IToolbarState> {
  state = {
    selectedPeriod: 300,

    periodDropdownIsOpen: false,
    zoomDropdownIsOpen: false
  };

  handlePeriodDropdownToggle = () => {
    this.setState({
      periodDropdownIsOpen: !this.state.periodDropdownIsOpen
    });
  };

  handleZoomDropdownToggle = () => {
    this.setState({
      zoomDropdownIsOpen: !this.state.zoomDropdownIsOpen
    });
  };

  renderLeftContent() {
    return [
      <NavItem key="left">
        <Link href="/cms/currencies" prefetch>
          <NavLink href="/cms/currencies">
            <FaList
              style={{
                marginRight: 10
              }}
            />
          </NavLink>
        </Link>
      </NavItem>
    ];
  }

  renderPeriodSelector() {
    const { period, handlePeriodChange } = this.props;

    const buttonGroupItems = periodOptions.map(x => {
      const active = x.value === period;

      return (
        <Button
          active={active}
          onClick={handlePeriodChange}
        >
          {x.label}
        </Button>
      );
    });

    return <ButtonGroup>{buttonGroupItems}</ButtonGroup>;
  }

  renderZoomDropdown() {
    return (
      <Dropdown
        isOpen={this.state.zoomDropdownIsOpen}
        toggle={this.handleZoomDropdownToggle}
      >
        <DropdownToggle nav caret>
          Date
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem disabled>Action</DropdownItem>
          <DropdownItem>Another Action</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Another Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  renderCollapseContent() {
    return [
      <Nav className="mr-auto" navbar key="left">
        {this.renderPeriodSelector()}
        {this.renderZoomDropdown()}
      </Nav>,

      <Nav className="ml-auto" navbar key="right">
        <NavItem key="left">
          <Link href="/cms/currencies" prefetch>
            <NavLink href="/cms/currencies">
              <FaCog />
            </NavLink>
          </Link>
        </NavItem>
      </Nav>
    ];
  }

  render() {
    return (
      <Navigation
        light
        leftContent={this.renderLeftContent()}
        collapseContent={this.renderCollapseContent()}
      />
    );
  }
}