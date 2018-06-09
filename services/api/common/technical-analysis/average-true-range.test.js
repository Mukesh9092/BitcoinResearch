import { averageTrueRange } from './average-true-range'

import { log } from '../log'
// log.setLevel('debug')

test('averageTrueRange / Empty Array', () => {
  const actual = []
  const expected = NaN

  expect(averageTrueRange(actual)).toEqual(expected)
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
  const expected = 4

  expect(averageTrueRange(actual)).toEqual(expected)
})

test('averageTrueRange / One OHLC object and an input', () => {
  const actual = [
    {
      open: 1,
      high: 2,
      low: 3,
      close: 4,
    },
  ]
  const expected = 3

  expect(averageTrueRange(actual, 'low')).toEqual(expected)
})

test.only('averageTrueRange / Array of OHLC objects', () => {
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
      open: 4,
      high: 4,
      low: 4,
      close: 4,
    },
    {
      open: 8,
      high: 8,
      low: 8,
      close: 8,
    },
    {
      open: 16,
      high: 16,
      low: 16,
      close: 16,
    },
    {
      open: 32,
      high: 32,
      low: 32,
      close: 32,
    },
  ]
  const expected = 0.56

  expect(averageTrueRange(actual)).toEqual(expected)
})
