import { simpleMovingAverage } from './simple-moving-average'

import { log } from '../log'
// log.setLevel('debug')

test('simpleMovingAverage / Empty Array', () => {
  const actual = []
  const expected = NaN

  expect(simpleMovingAverage(actual)).toEqual(expected)
})

test('simpleMovingAverage / One OHLC object', () => {
  const actual = [
    {
      open: 1,
      high: 2,
      low: 3,
      close: 4,
    },
  ]
  const expected = 4

  expect(simpleMovingAverage(actual)).toEqual(expected)
})

test('simpleMovingAverage / One OHLC object and an input', () => {
  const actual = [
    {
      open: 1,
      high: 2,
      low: 3,
      close: 4,
    },
  ]
  const expected = 3

  expect(simpleMovingAverage(actual, 'low')).toEqual(expected)
})

test('simpleMovingAverage / Array of OHLC objects', () => {
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
  const expected = 3

  expect(simpleMovingAverage(actual)).toEqual(expected)
})
