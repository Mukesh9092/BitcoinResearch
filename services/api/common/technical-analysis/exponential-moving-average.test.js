import { exponentialMovingAverage } from './exponential-moving-average'

test('exponentialMovingAverage / Empty Array', () => {
  const actual = []
  const expected = NaN

  expect(exponentialMovingAverage(actual)).toEqual(expected)
})

test('exponentialMovingAverage / Window higher then Array', () => {
  const window = 3
  const actual = [
    {
      open: 1,
      high: 2,
      low: 3,
      close: 4,
    },
    {
      open: 2,
      high: 3,
      low: 4,
      close: 5,
    },
  ]
  const expected = NaN

  expect(exponentialMovingAverage(actual, window)).toEqual(expected)
})

test('exponentialMovingAverage / One OHLC object', () => {
  const actual = [
    {
      open: 1,
      high: 2,
      low: 3,
      close: 4,
    },
  ]
  const expected = [
    {
      ema: 4,
    },
  ]

  expect(exponentialMovingAverage(actual)).toEqual(expected)
})

test('exponentialMovingAverage / One OHLC object and an input', () => {
  const window = 1
  const actual = [
    {
      open: 1,
      high: 2,
      low: 3,
      close: 4,
    },
  ]
  const expected = [
    {
      ema: 3,
    },
  ]

  expect(exponentialMovingAverage(actual, window, 'low')).toEqual(expected)
})

test('exponentialMovingAverage / Array of OHLC objects', () => {
  const window = 3
  const actual = [
    {
      open: 1,
      high: 1,
      low: 1,
      close: 1,
    },
    {
      open: 2,
      high: 2,
      low: 2,
      close: 2,
    },
    {
      open: 3,
      high: 3,
      low: 3,
      close: 3,
    },
    {
      open: 4,
      high: 4,
      low: 4,
      close: 4,
    },
    {
      open: 5,
      high: 5,
      low: 5,
      close: 5,
    },
  ]
  const expected = [
    {
      ema: 1,
    },
    {
      ema: 1,
    },
    {
      ema: 1.5,
    },
    {
      ema: 2.25,
    },
    {
      ema: 3.125,
    },
  ]

  expect(exponentialMovingAverage(actual, window)).toEqual(expected)
})
