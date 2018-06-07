import { averageTrueRange } from './average-true-range'

test('averageTrueRange / Empty Array', () => {
  const actual = []
  const expected = NaN

  expect(averageTrueRange(actual)).toEqual(expected)
})

test('averageTrueRange / Window higher then Array', () => {
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

  expect(averageTrueRange(actual, window)).toEqual(expected)
})

test('averageTrueRange / One OHLC object', () => {
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
      atr: 4,
    },
  ]

  expect(averageTrueRange(actual)).toEqual(expected)
})

test('averageTrueRange / One OHLC object and an input', () => {
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
      atr: 3,
    },
  ]

  expect(averageTrueRange(actual, window, 'low')).toEqual(expected)
})

test('averageTrueRange / Array of OHLC objects', () => {
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
      atr: 1,
    },
    {
      atr: 2.3333333333333335,
    },
    {
      atr: 6.333333333333333,
    },
    {
      atr: 18.333333333333332,
    },
    {
      atr: 54.333333333333336,
    },
  ]

  expect(averageTrueRange(actual, window)).toEqual(expected)
})
