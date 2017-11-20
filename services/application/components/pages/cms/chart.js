import FaList from "react-icons/lib/fa/list";
import FaCog from "react-icons/lib/fa/cog";
import Link from "next/link";
import React from "react";

import {
  Button,
  ButtonGroup,
  ButtonDropdown,
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
import { fitDimensions } from "react-stockcharts/lib/helper";

import { Container } from "../../../components/common/container";
import { Navigation } from "../../../components/common/navigation";

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

export class MarketChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 600,

      showCandlesticks: true,
      showVolume: true
    };
  }

  renderCandlesticks() {
    const { height } = this.state;

    const candlesticksHeight = height / 100 * 80;

    console.log("MarketChart#renderCandlesticks", candlesticksHeight);

    return (
      <StockChart id={1} height={height} yExtents={d => [d.high, d.low]}>
        <XAxis axisAt="bottom" orient="bottom" ticks={6} />
        <YAxis
          axisAt="right"
          orient="right"
          ticks={6}
          displayFormat={format(".3s")}
        />
        <MouseCoordinateY
          at="right"
          orient="right"
          displayFormat={format(".3s")}
        />
        <CandlestickSeries />
      </StockChart>
    );
  }

  renderVolume() {
    const { height } = this.state;

    const volumeHeight = height / 100 * 20;

    console.log("MarketChart#renderVolume", volumeHeight);

    return (
      <StockChart
        id={2}
        origin={(w, h) => [0, h - volumeHeight]}
        height={volumeHeight}
        yExtents={d => d.volume}
      >
        <YAxis
          axisAt="left"
          orient="left"
          ticks={6}
          displayFormat={format(".3s")}
        />
        <MouseCoordinateX
          at="top"
          orient="bottom"
          displayFormat={timeFormat("%X")}
        />
        <MouseCoordinateY
          at="left"
          orient="left"
          displayFormat={format(".3s")}
        />
        <BarSeries height={volumeHeight} yAccessor={d => d.volume} />
      </StockChart>
    );
  }

  render() {
    // console.log("MarketChart#render", this.props);

    const { showCandlesticks, showVolume } = this.state;
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

    let candlesticksComponent = null;
    if (showCandlesticks) {
      candlesticksComponent = this.renderCandlesticks();
    }

    let volumeComponent = null;
    if (showVolume) {
      volumeComponent = this.renderVolume();
    }

    return (
      <ChartCanvas
        ratio={ratio}
        width={width - 15}
        height={740}
        margin={{
          left: 100,
          right: 100,
          top: 10,
          bottom: 30
        }}
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
        {candlesticksComponent}
        {volumeComponent}

        <CrossHairCursor ratio={ratio} />
      </ChartCanvas>
    );
  }
}

const FittedMarketChart = fitDimensions(MarketChart);

export class MarketChartNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPeriod: periodOptions.find(x => x.label === "5m"),

      periodDropdownOpen: false,
      zoomDropdownOpen: false
    };
  }

  handlePeriodDropdownToggle = () => {
    this.setState({
      periodDropdownOpen: !this.state.periodDropdownOpen
    });
  };

  handleZoomDropdownToggle = () => {
    this.setState({
      zoomDropdownOpen: !this.state.zoomDropdownOpen
    });
  };

  renderNavLink(url, label) {
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
  }

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
        <Button active={active} onClick={handlePeriodChange}>
          {x.label}
        </Button>
      );
    });

    return <ButtonGroup>{buttonGroupItems}</ButtonGroup>;
  }

  renderZoomDropdown() {
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

export class ChartContainer extends React.Component {
  constructor(props) {
    super(props);

    const {
      store: { candlesticks },
      currencyA,
      currencyB,
      currencyPair,
      period,
      start,
      end
    } = props;

    this.state = {
      currencyA,
      currencyB,
      currencyPair,
      candlesticks,
      period,
      start,
      end
    };
  }

  handlePeriodChange = async newPeriod => {
    console.log("ChartContainer#handlePeriodChange");

    const { currencyA, currencyB, start, end, load } = this.props;

    await load(currencyA, currencyB, newPeriod, start, end);

    this.setState({
      period: newPeriod
    });
  };

  render() {
    const {
      currencyA,
      currencyB,
      currencyPair,
      candlesticks,
      period,
      start,
      end
    } = this.state;

    return (
      <div>
        <MarketChartNavbar
          currencyA={currencyA}
          currencyB={currencyB}
          currencyPair={currencyPair}
          period={period}
          start={start}
          end={end}
          handlePeriodChange={this.handlePeriodChange}
        />

        <Container>
          <FittedMarketChart
            currencyPair={currencyPair}
            candlesticks={candlesticks}
          />
        </Container>
      </div>
    );
  }
}
