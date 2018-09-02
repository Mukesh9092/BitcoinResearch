import { createWriteStream } from 'fs'

import D3Node from 'd3-node'
import canvasModule from 'canvas'
import ccxt from 'ccxt'
import techan from 'techan'
import * as d3 from 'd3'

import { simpleMovingAverage } from './common/technical-analysis/simple-moving-average'
import { exponentialMovingAverage } from './common/technical-analysis/exponential-moving-average'
import { exponentialMovingAverageCross } from './common/technical-analysis/exponential-moving-average-cross'
import { bollingerBand } from './common/technical-analysis/bollinger-band'
import { keltnerChannel } from './common/technical-analysis/keltner-channel'
import { squeeze } from './common/technical-analysis/squeeze'
import { strategy } from './common/technical-analysis/strategy'
import { log } from './common/log'
import { access, readFile, writeFile } from './common/file-system'

log.setLevel('debug')

// TODO: Correct format
const parseDate = d3.timeParse('%d-%b-%y')

// Because classes should start with an uppercase letter.
const Binance = ccxt.binance

// How many candles to load
const DATA_SET_SIZE = 1000

// How many candles to load extra in order to calculate the first indicator
// value correctly.
const LARGEST_INDICATOR_DATA_SET_SIZE = 20

// The market to load
const MARKET_SYMBOL = 'ETH/BTC'

// The timeframe to load
const TIMEFRAME = '1d'

// Amount of bars to request each update
const UPDATE_BAR_COUNT = 2

// Interval to request each update at.
const UPDATE_INTERVAL_MILLISECONDS = 1000 * 2

const emaShortLength = 7
const emaLongLength = 20
const bbLength = 20
const bbMultiplier = 1.5
const kcLength = 20
const kcAtrLength = 14
const kcAtrMultiplier = 1.5

function convertToObjectOfArrays(array) {
  const output = {}

  array.forEach((x) => {
    Object.keys(x).forEach((key) => {
      output[key] = output[key] || []
      output[key].push(x[key])
    })
  })

  return output
}

async function getOHLCV(exchange) {
  // log.debug('getOHLCV', exchange)

  const filePathSymbol = MARKET_SYMBOL.replace('/', '-')

  const filePath = `./ohlcv_input/${filePathSymbol}_${TIMEFRAME}.json`

  // log.debug('getOHLCV filePath', filePath)

  const canAccess = await access(filePath)

  // log.debug('getOHLCV canAccess', canAccess)

  if (canAccess) {
    const fileContents = await readFile(filePath)
    const fileContentsAsObject = JSON.parse(fileContents)
    return fileContentsAsObject
  }

  const fetchResult = await exchange.fetchOHLCV(
    MARKET_SYMBOL,
    TIMEFRAME,
    undefined,
    DATA_SET_SIZE + LARGEST_INDICATOR_DATA_SET_SIZE,
  )

  // log.debug('getOHLCV fetchResult', fetchResult)

  const convertedFetchResult = fetchResult.map((row) => {
    return {
      date: row[0],
      open: row[1],
      high: row[2],
      low: row[3],
      close: row[4],
      volume: row[5],
    }
  })

  const convertedFetchResultAsJSON = JSON.stringify(convertedFetchResult)

  await writeFile(filePath, convertedFetchResultAsJSON)

  return convertedFetchResult
}

async function getIndicators(ohlcv) {
  const emaShort = exponentialMovingAverage(ohlcv, 'close', emaShortLength)
  const emaLong = exponentialMovingAverage(ohlcv, 'close', emaLongLength)

  const emaCross = exponentialMovingAverageCross(
    ohlcv,
    'close',
    emaShortLength,
    emaLongLength,
  )

  const bb = bollingerBand(ohlcv, 'close', bbLength, bbMultiplier)

  const kc = keltnerChannel(
    ohlcv,
    'close',
    kcLength,
    kcAtrLength,
    kcAtrMultiplier,
  )

  const sq = squeeze(
    ohlcv,
    'close',
    bbLength,
    bbMultiplier,
    kcLength,
    kcAtrLength,
    kcAtrMultiplier,
  )

  const strat = strategy(
    ohlcv,
    'close',
    emaShortLength,
    emaLongLength,
    bbLength,
    bbMultiplier,
    kcLength,
    kcAtrLength,
    kcAtrMultiplier,
  )

  return {
    emaShort,
    emaLong,
    emaCross,
    strat,
    bbMiddle: bb.map((x) => {
      return x[0]
    }),
    bbUpper: bb.map((x) => {
      return x[1]
    }),
    bbLower: bb.map((x) => {
      return x[2]
    }),
    kcMiddle: kc.map((x) => {
      return x[0]
    }),
    kcUpper: kc.map((x) => {
      return x[1]
    }),
    kcLower: kc.map((x) => {
      return x[2]
    }),
    squeeze: sq,
  }
}

async function saveOutput(object) {
  // log.debug('saveOutput object', object)

  const filePathSymbol = MARKET_SYMBOL.replace('/', '-')

  // log.debug('saveOutput filePathSymbol', filePathSymbol)

  const filePath = `./ohlcv_output/${filePathSymbol}_${TIMEFRAME}.json`

  // log.debug('saveOutput filePath', filePath)

  const objectJSON = JSON.stringify(object)

  // log.debug('saveOutput objectJSON', objectJSON)

  await writeFile(filePath, objectJSON)
}

async function saveChartAsHTML(d3n, filePath) {
  try {
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

async function drawChart(data) {
  try {
    const filePathSymbol = MARKET_SYMBOL.replace('/', '-')
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

    const chartWidth = containerWidth - margin.left - margin.right
    const chartHeight = containerHeight - margin.top - margin.bottom

    const x = techan.scale.financetime().range([0, chartWidth])
    const y = d3.scaleLinear().range([chartHeight, 0])

    const candlestick = techan.plot
      .candlestick()
      .xScale(x)
      .yScale(y)

    const candlestickAccessor = candlestick.accessor()

    const xAxis = d3.axisBottom(x)
    const yAxis = d3.axisLeft(y)

    const svg = d3n
      .createSVG(containerWidth, containerHeight)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    svg.append('g').attr('class', 'candlestick')

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

    x.domain(data.map(candlestickAccessor.d))
    y.domain(techan.scale.plot.ohlc(data, candlestickAccessor).domain())

    svg
      .selectAll('g.candlestick')
      .datum(data)
      .call(candlestick)

    await saveChartAsHTML(d3n, filePath)
  } catch (error) {
    log.error(error)
  }
}

async function start() {
  try {
    const exchange = new Binance({ id: 'binance1' })

    const ohlcv = await getOHLCV(
      exchange,
      MARKET_SYMBOL,
      TIMEFRAME,
      DATA_SET_SIZE + LARGEST_INDICATOR_DATA_SET_SIZE,
    )

    // log.debug('ohlcv', ohlcv)

    const indicators = await getIndicators(ohlcv)

    // log.debug('indicators', indicators)

    const combined = ohlcv.map((row, i) => {
      const output = {
        ...row,
      }

      Object.keys(indicators).forEach((key) => {
        output[key] = indicators[key][i]
      })

      return output
    })

    await saveOutput(combined)

    await drawChart(combined)

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
  } catch (error) {
    log.error(error)
  }
}

start()
