import { standardDeviation } from './standard-deviation'

import { log } from '../log'
// log.setLevel('debug')

test('standardDeviation / Empty Array', () => {
  const actual = []
  const expected = {
    stddev: NaN,
  }

  expect(standardDeviation(actual)).toEqual(expected)
})

test('standardDeviation / One number', () => {
  const actual = [
    {
      open: 0,
      high: 0,
      low: 0,
      close: 0,
    },
  ]
  const expected = {
    stddev: NaN,
  }

  expect(standardDeviation(actual)).toEqual(expected)
})

test('standardDeviation / One number with input', () => {
  const actual = [
    {
      open: 0,
      high: 0,
      low: 0,
      close: 0,
    },
  ]
  const expected = {
    stddev: NaN,
  }

  expect(standardDeviation(actual)).toEqual(expected)
})

test.only('standardDeviation / Array of numbers', () => {
  const actual = [
    {
      open: 0,
      high: 0,
      low: 0,
      close: 1,
    },
    {
      open: 0,
      high: 0,
      low: 0,
      close: 2,
    },
    {
      open: 0,
      high: 0,
      low: 0,
      close: 3,
    },
    {
      open: 0,
      high: 0,
      low: 0,
      close: 4,
    },
  ]
  const expected = {
    stddev: 1.118033988749895,
  }

  expect(standardDeviation(actual)).toEqual(expected)
})
