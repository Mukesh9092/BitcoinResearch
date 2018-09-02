import { exponentialMovingAverageCross } from './exponential-moving-average-cross'

import testData from './_data'

import { log } from '../log'

test('exponentialMovingAverageCross', () => {
  const actual = testData
  const input = 'close'
  const emaShortLength = 7
  const emaLongLength = 14
  const expected = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
  ]

  expect(
    exponentialMovingAverageCross(actual, input, emaShortLength, emaLongLength),
  ).toEqual(expected)
})
