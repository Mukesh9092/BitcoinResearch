import { mean } from './mean'

import { log } from '../log'
// log.setLevel('debug')

test('mean / Empty Array', () => {
  const actual = []
  const expected = NaN

  expect(mean(actual)).toEqual(expected)
})

test('mean / Array of one number', () => {
  const actual = [1]
  const expected = 1

  expect(mean(actual)).toEqual(expected)
})

test('mean / Array of numbers', () => {
  const actual = [1, 2, 3]
  const expected = 2

  expect(mean(actual)).toEqual(expected)
})

test('mean / Array of numbers', () => {
  const actual = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const expected = 5.5

  expect(mean(actual)).toEqual(expected)
})
