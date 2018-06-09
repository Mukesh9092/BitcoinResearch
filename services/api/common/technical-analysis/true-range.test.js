import { trueRange } from './true-range'

import { log } from '../log'

log.setLevel('debug')

test('trueRange / Empty array', () => {
  const previous = {}
  const current = {}
  const expected = NaN

  expect(trueRange(previous, current)).toEqual(expected)
})

test('trueRange / Two OHLC objects where Current High - Current Low is the highest', () => {
  const previous = {
    high: 8,
    close: 5,
    open: 4,
    low: 0,
  }
  const current = {
    high: 12,
    close: 11,
    open: 10,
    low: 10,
  }
  const expected = 2

  expect(trueRange(previous, current)).toEqual(expected)
})

test.only('trueRange / Two OHLC objects where Current High - Previous Close is the highest', () => {
  const previous = {
    high: 6,
    close: 3,
    open: 2,
    low: 0,
  }
  const current = {
    high: 5,
    close: 5,
    open: 4,
    low: 4,
  }
  const expected = 2

  expect(trueRange(previous, current)).toEqual(expected)
})

test('trueRange / Two OHLC objects where Current Low - Previous Close is the highest', () => {
  const previous = {
    high: 7,
    close: 9,
    open: 8,
    low: 4,
  }
  const current = {
    high: 2,
    close: 2,
    open: 1,
    low: 0,
  }
  const expected = 2

  expect(trueRange(previous, current)).toEqual(expected)
})
