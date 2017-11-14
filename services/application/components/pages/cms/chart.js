import FaList from "react-icons/lib/fa/list";
import FaCog from "react-icons/lib/fa/cog";
import Link from "next/link";
import React from "react";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
  BarSeries,
  CandlestickSeries,
  LineSeries
} from "react-stockcharts/lib/series";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { last } from "react-stockcharts/lib/utils";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY
} from "react-stockcharts/lib/coordinates";
import { ChartCanvas, Chart as StockChart } from "react-stockcharts";

import { Navigation } from "../../../components/common/navigation";

export class MarketChart extends React.Component {
  render() {
    console.log("MarketChart#render", this.props);

    const { currencyPair, candlesticks, width, height, ratio } = this.props;

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      d => new Date(d.id)
    );
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      candlesticks
    );
    const xExtents = [
      xAccessor(last(data)),
      xAccessor(data[data.length - 100])
    ];

    return (
      <ChartCanvas
        ratio={ratio}
        width={width - 20}
        height={height}
        margin={{ left: 60, right: 100, top: 10, bottom: 30 }}
        type="svg"
        seriesName={currencyPair}
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
        padding={{
          top: 10,
          bottom: 10,
          left: 10,
          right: 50
        }}
      >
        <StockChart id={1} yExtents={d => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6} />
          <YAxis
            axisAt="right"
            orient="right"
            ticks={6}
            displayFormat={format(".3s")}
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".3s")}
          />
          <CandlestickSeries />
        </StockChart>

        <StockChart id={2} yExtents={d => d.volume}>
          <YAxis
            axisAt="left"
            orient="left"
            ticks={5}
            displayFormat={format(".3s")}
          />
          <MouseCoordinateY
            at="left"
            orient="left"
            displayFormat={format(".3s")}
          />
          <BarSeries yAccessor={d => d.volume} />
        </StockChart>

        <CrossHairCursor ratio={ratio} />
      </ChartCanvas>
    );
  }
}

export class MarketChartNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rangeDropdownOpen: false,
      zoomDropdownOpen: false
    };
  }

  handleRangeDropdownToggle = () => {
    this.setState({
      rangeDropdownOpen: !this.state.rangeDropdownOpen
    });
  };

  handleZoomDropdownToggle = () => {
    this.setState({
      zoomDropdownOpen: !this.state.zoomDropdownOpen
    });
  };

  renderNavLink = (url, label) => {
    const { pathname } = this.props;

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

  renderLeftContent = () => [
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

  renderRangeDropdown = () => {
    return (
      <Dropdown
        isOpen={this.state.rangeDropdownOpen}
        toggle={this.handleRangeDropdownToggle}
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
  };

  renderZoomDropdown = () => {
    return (
      <Dropdown
        isOpen={this.state.zoomDropdownOpen}
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
  };

  renderCollapseContent = () => [
    <Nav className="mr-auto" navbar key="left">
      {this.renderRangeDropdown()}
      {this.renderZoomDropdown()}
      {this.renderNavLink("/cms", "Some")}
      {this.renderNavLink("/cms/users", "Links")}
      {this.renderNavLink("/cms/currencies", "Go")}
      {this.renderNavLink("/cms/currencies/erm", "Here")}
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
