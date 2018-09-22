import * as math from 'mathjs'
import { inspect } from 'util'
import { createWriteStream } from 'fs'

import ccxt from 'ccxt'
import D3Node from 'd3-node'
import canvasModule from 'canvas'
import techan from 'techan'
import * as d3 from 'd3'

import { exponentialMovingAverage } from './common/technical-analysis/exponential-moving-average'
import { exponentialMovingAverageCross } from './common/technical-analysis/exponential-moving-average-cross'
import { bollingerBand } from './common/technical-analysis/bollinger-band'
import { keltnerChannel } from './common/technical-analysis/keltner-channel'
import { squeeze } from './common/technical-analysis/squeeze'
import { strategy } from './common/technical-analysis/strategy'
import { log } from './common/log'
import { access, readFile, writeFile } from './common/file-system'
import { sleep, allSerially } from './common/promise'

import apiKeys from './apiKeys.json'

log.setLevel('debug')

// How many candles to load
const DATA_SET_SIZE = 1000

// How many candles to load extra in order to calculate the first indicator
// value correctly.
const LARGEST_INDICATOR_DATA_SET_SIZE = 20

// The market to load
const MARKET_SYMBOL = 'FB/USD'

// The timeframe to load
const TIMEFRAME = '1d'

// TODO: Find a better wording.
// The exponent of 10 to do calculations by.
const PRECISION = 8

// Amount of bars to request each update
const UPDATE_BAR_COUNT = 2

// Interval to request each update at.
const UPDATE_INTERVAL_MILLISECONDS = 1000 * 2

// Start amount of coin to begin with.
const START_COIN_AMOUNT = 1000

// What percentage of the available coin to trade
const EQUITY_PER_TRADE_PERCENTAGE = 1.0

// The trader's cut
const COMMMISSION_PER_TRADE_PERCENTAGE = 0.0025

// Because classes should start with an uppercase letter.
const Binance = ccxt.binance
// eslint-disable-next-line no-underscore-dangle
const OneBroker = ccxt._1broker

// const exchange = new Binance({
//   id: 'binance',
//   enableRateLimit: true,
// })
const exchange = new OneBroker({
  id: 'onebroker',
  apiKey: apiKeys.onebroker.apiKey,
  enableRateLimit: true,
})

const emaShortLength = 7
const emaLongLength = 20
const bbLength = 20
const bbMultiplier = 1.5
const kcLength = 20
const kcAtrLength = 14
const kcAtrMultiplier = 1.5

function formatNumber(n, precision = PRECISION) {
  return Number(
    math.format(n, {
      notation: 'fixed',
      precision,
    }),
  )
}

function commission(n) {
  return math.eval(`${n} - ${n} * ${COMMMISSION_PER_TRADE_PERCENTAGE}`)
}

function runAlgorithm(data, baseAmount) {
  let previousStrategyValue = null
  let firstTrueValue = false
  const moves = data.filter((row) => {
    const { strategy } = row

    if (!firstTrueValue) {
      if (strategy === true) {
        firstTrueValue = true
        previousStrategyValue = strategy
        return true
      }

      previousStrategyValue = strategy
      return false
    }

    if (strategy !== previousStrategyValue) {
      previousStrategyValue = strategy
      return true
    }

    previousStrategyValue = strategy
    return false
  })

  let currentBaseAmount = baseAmount
  let currentQuoteAmount = 0
  let lastBaseAmount = baseAmount
  let lastQuoteAmount = null

  moves.forEach((row) => {
    const { open, close, strategy } = row

    const averagePrice = formatNumber(math.eval(`(${open} + ${close}) / 2`))

    if (row.strategy === true) {
      currentQuoteAmount = formatNumber(commission(math.eval(`${currentBaseAmount} / ${averagePrice}`)))
      currentBaseAmount = 0
      lastQuoteAmount = currentQuoteAmount
    } else {
      currentBaseAmount = formatNumber(commission(math.eval(`${currentQuoteAmount} * ${averagePrice}`)))
      currentQuoteAmount = 0
      lastBaseAmount = currentBaseAmount
    }

    previousStrategyValue = strategy
  })

  return {
    base: currentBaseAmount,
    quote: currentQuoteAmount,
    lastBaseAmount,
    lastQuoteAmount,
    moves,
  }
}

async function getOHLCV(exchange, marketSymbol = MARKET_SYMBOL) {
  log.debug(`getOHLCV ${marketSymbol}`)

  const inputFilePath = `./ohlcv_input/${marketSymbol.replace('/', '-')}_${TIMEFRAME}.json`

  // log.debug(`getOHLCV ${marketSymbol} inputFilePath ${inputFilePath}`)

  const canAccess = await access(inputFilePath)

  // log.debug(`getOHLCV ${marketSymbol} canAccess ${canAccess}`)

  if (canAccess) {
    const fileContents = await readFile(inputFilePath)
    const fileContentsAsObject = JSON.parse(fileContents)
    return fileContentsAsObject
  }

  const fetchResult = await exchange.fetchOHLCV(
    marketSymbol,
    TIMEFRAME,
    undefined,
    DATA_SET_SIZE + LARGEST_INDICATOR_DATA_SET_SIZE,
  )

  const ohlcv = fetchResult.map((row) => ({
    date: row[0],
    open: row[1],
    high: row[2],
    low: row[3],
    close: row[4],
    volume: row[5],
  }))

  const ohlcvJSON = JSON.stringify(ohlcv)

  log.debug(`getOHLCV ${marketSymbol} writing`)

  await writeFile(inputFilePath, ohlcvJSON)

  log.debug(`getOHLCV ${marketSymbol} writing done`)

  return ohlcv
}

async function getIndicators(ohlcv, marketSymbol = MARKET_SYMBOL) {
  log.debug(`getIndicators ${marketSymbol}`)

  const emaShort = exponentialMovingAverage(ohlcv, PRECISION, 'close', emaShortLength)
  const emaLong = exponentialMovingAverage(ohlcv, PRECISION, 'close', emaLongLength)
  const emaCross = exponentialMovingAverageCross(ohlcv, PRECISION, 'close', emaShortLength, emaLongLength)
  const bb = bollingerBand(ohlcv, PRECISION, 'close', bbLength, bbMultiplier)
  const kc = keltnerChannel(ohlcv, PRECISION, 'close', kcLength, kcAtrLength, kcAtrMultiplier)
  const sq = squeeze(ohlcv, PRECISION, 'close', bbLength, bbMultiplier, kcLength, kcAtrLength, kcAtrMultiplier)

  const strat = strategy(
    ohlcv,
    PRECISION,
    'close',
    emaShortLength,
    emaLongLength,
    bbLength,
    bbMultiplier,
    kcLength,
    kcAtrLength,
    kcAtrMultiplier,
  )

  const output = ohlcv.map((row, i) => ({
    ...row,
    emaShort: emaShort[i],
    emaLong: emaLong[i],
    emaCross: emaCross[i],
    bbUpper: bb[i][0],
    bbMiddle: bb[i][1],
    bbLower: bb[i][2],
    kcUpper: kc[i][0],
    kcMiddle: kc[i][1],
    kcLower: kc[i][2],
    squeeze: sq[i],
    strategy: strat[i],
  }))

  const outputFilePath = `./ohlcv_output/${marketSymbol.replace('/', '-')}_${TIMEFRAME}.json`
  const outputJSON = JSON.stringify(output)

  log.debug(`getIndicators ${marketSymbol} writing`)

  await writeFile(outputFilePath, outputJSON)

  log.debug(`getIndicators ${marketSymbol} writing done`)

  return output
}

async function getMarketData(exchange, marketSymbol) {
  log.debug(`getMarketData ${marketSymbol}`)

  const ohlcv = await getOHLCV(exchange, marketSymbol)

  log.debug(`getMarketData ${marketSymbol} ohlcv ${ohlcv.length}`)

  const combined = await getIndicators(ohlcv, marketSymbol)

  log.debug(`getMarketData ${marketSymbol} combined ${combined.length}`)

  return combined
}

async function start() {
  try {
    const markets = await exchange.loadMarkets()
    const marketSymbols = Object.keys(markets)

    const output = []

    for (let marketSymbol of marketSymbols) {
      const combined = await getMarketData(exchange, marketSymbol)

      const { base, lastBaseAmount, moves } = runAlgorithm(combined, START_COIN_AMOUNT)
      const amount = base || lastBaseAmount
      const absolute = formatNumber(math.eval(`${amount} - ${START_COIN_AMOUNT}`))
      const percentage = formatNumber(math.eval(`${absolute} / ${START_COIN_AMOUNT} * 100`), 2)

      log.debug(`market ${marketSymbol} $${absolute}`)
      log.debug(`market ${marketSymbol} %${percentage}`)

      // await drawChart(combined, moves, marketSymbol)

      return {
        key: marketSymbol,
        abs: absolute,
        pct: percentage,
      }
    }

    log.debug('GRAND RESULT', result)

    return result
  } catch (error) {
    log.error(error)
  }
}

start()

async function saveChartAsHTML(d3n, filePath) {
  try {
    log.debug('saveChartAsHTML', filePath)

    await writeFile(filePath, d3n.html())
  } catch (error) {
    log.error(error)
  }
}

async function saveChartAsPNG(d3n, canvas, filePath) {
  try {
    // Draw to canvas instead of SVG
    // const canvas = d3n.createCanvas(containerWidth, containerHeight)
    // const context = canvas.getContext('2d')

    const writeStream = createWriteStream(filePath)
    const writePromise = new Promise((resolve, reject) => {
      writeStream.on('finish', resolve)
      writeStream.on('error', reject)
    })

    canvas.pngStream().pipe(writeStream)
    await writePromise

    await writeFile(filePath, d3n.html())
  } catch (error) {
    log.error(error)
  }
}

async function drawChart(data, tradesData, marketSymbol) {
  try {
    const filePathSymbol = marketSymbol.replace('/', '-')
    const filePath = `./ohlcv_html/${filePathSymbol}_${TIMEFRAME}.html`

    const styles = `
      body {
        font: 10px sans-serif;
      }

      text {
        fill: #000;
      }

      button {
        position: absolute;
        right: 20px;
        top: 440px;
        display: none;
      }

      path {
          fill: none;
          stroke-width: 1;
      }

      path.candle {
          stroke: #000000;
      }

      path.candle.body {
          stroke-width: 0;
      }

      path.candle.up {
          fill: #00AA00;
          stroke: #00AA00;
      }

      path.candle.down {
          fill: #FF0000;
          stroke: #FF0000;
      }

      .close.annotation.up path {
          fill: #00AA00;
      }

      path.volume {
          fill: #DDDDDD;
      }

      .indicator-plot path.line {
          fill: none;
          stroke-width: 1;
      }

      .ma-0 path.line {
          stroke: #1f77b4;
      }

      .ma-1 path.line {
          stroke: #aec7e8;
      }

      .ma-2 path.line {
          stroke: #ff7f0e;
      }

      button {
          position: absolute;
          right: 110px;
          top: 25px;
      }

      path.macd {
          stroke: #0000AA;
      }

      path.signal {
          stroke: #FF9999;
      }

      path.zero {
          stroke: #BBBBBB;
          stroke-dasharray: 0;
          stroke-opacity: 0.5;
      }

      path.difference {
          fill: #BBBBBB;
          opacity: 0.5;
      }

      path.rsi {
          stroke: #000000;
      }

      path.overbought, path.oversold {
          stroke: #FF9999;
          stroke-dasharray: 5, 5;
      }

      path.middle, path.zero {
          stroke: #BBBBBB;
          stroke-dasharray: 5, 5;
      }

      .analysis path, .analysis circle {
          stroke: blue;
          stroke-width: 0.8;
      }

      .trendline circle {
          stroke-width: 0;
          display: none;
      }

      .mouseover .trendline path {
          stroke-width: 1.2;
      }

      .mouseover .trendline circle {
          stroke-width: 1;
          display: inline;
      }

      .dragging .trendline path, .dragging .trendline circle {
          stroke: darkblue;
      }

      .interaction path, .interaction circle {
          pointer-events: all;
      }

      .interaction .body {
          cursor: move;
      }

      .trendlines .interaction .start, .trendlines .interaction .end {
          cursor: nwse-resize;
      }

      .supstance path {
          stroke-dasharray: 2, 2;
      }

      .supstances .interaction path {
          pointer-events: all;
          cursor: ns-resize;
      }

      .mouseover .supstance path {
          stroke-width: 1.5;
      }

      .dragging .supstance path {
          stroke: darkblue;
      }

      .crosshair {
          cursor: crosshair;
      }

      .crosshair path.wire {
          stroke: #DDDDDD;
          stroke-dasharray: 1, 1;
      }

      .crosshair .axisannotation path {
          fill: #DDDDDD;
      }

      .tradearrow path.tradearrow {
          stroke: none;
      }

      .tradearrow path.buy {
          fill: #0000FF;
      }

      .tradearrow path.sell {
          fill: #9900FF;
      }

      .tradearrow path.highlight {
          fill: none;
          stroke-width: 2;
      }

      .tradearrow path.highlight.buy {
          stroke: #0000FF;
      }

      .tradearrow path.highlight.sell {
          stroke: #9900FF;
      }
    `

    const d3n = new D3Node({
      canvasModule,
      d3Module: d3,
      styles,
    })

    const containerWidth = 800
    const containerHeight = 600

    const margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50,
    }

    const formatDate = d3.timeFormat('%d-%b-%y')
    const parseDate = d3.timeParse('%d-%b-%y')
    const formatValue = d3.format(',.2f')

    const chartWidth = containerWidth - margin.left - margin.right
    const chartHeight = containerHeight - margin.top - margin.bottom

    const x = techan.scale.financetime().range([0, chartWidth])
    const y = d3.scaleLinear().range([chartHeight, 0])

    const svg = d3n
      .createSVG(containerWidth, containerHeight)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const valueText = svg
      .append('text')
      .style('text-anchor', 'end')
      .attr('class', 'coords')
      .attr('x', chartWidth - 5)
      .attr('y', 15)

    const candlestick = techan.plot
      .candlestick()
      .xScale(x)
      .yScale(y)

    const candlestickAccessor = candlestick.accessor()

    const tradearrow = techan.plot
      .tradearrow()
      .xScale(x)
      .yScale(y)
      .orient((d) => {
        console.log('orient', d.strategy)
        return strategy === true ? 'up' : 'down'
      })
      .on('mouseenter', (d) => {
        valueText.style('display', 'inline')
        valueText.text(`Trade: ${formatDate(d.date)}, ${d.type}, ${formatValue(d.price)}`)
      })
      .on('mouseout', (d) => {
        valueText.style('display', 'none')
      })

    const volume = techan.plot
      .volume()
      .accessor(techan.accessor.ohlc())
      .xScale(x)
      .yScale(y)

    const xAxis = d3.axisBottom(x)
    const yAxis = d3.axisLeft(y)

    svg.append('g').attr('class', 'candlestick')
    svg.append('g').attr('class', 'tradearrow')
    svg.append('g').attr('class', 'volume')

    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${chartHeight})`)

    svg
      .append('g')
      .attr('class', 'y axis')
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Price ($)')

    svg.selectAll('g.x.axis').call(xAxis)

    svg.selectAll('g.y.axis').call(yAxis)

    svg
      .selectAll('g.candlestick')
      .datum(data)
      .call(candlestick)

    // svg
    //   .selectAll('g.tradearrow')
    //   .datum(tradesData)
    //   .call(tradearrow)

    svg
      .selectAll('g.volume')
      .datum(data)
      .call(volume)

    x.domain(data.map(candlestickAccessor.d))
    y.domain(techan.scale.plot.ohlc(data, candlestickAccessor).domain())

    await saveChartAsHTML(d3n, filePath)
  } catch (error) {
    log.error(error)
  }
}

/*
// Get the indicators based on this data set.
const indicators = getIndicators(ohlcv)

setInterval(async () => {
  try {
    const newOHLCV = await exchange.fetchOHLCV(
      MARKET_SYMBOL,
      TIMEFRAME,
      undefined,
      1,
    )

    const ohlcv = await getOHLCV()

    await updateValues(ohlcv)

    log.debug('writing', resultSet[resultSet.length - 1])
  } catch (error) {
    log.error(error)
  }
}, UPDATE_INTERVAL_MILLISECONDS)
*/
