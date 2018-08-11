import { simpleMovingAverage } from './simple-moving-average'

import testData from './_data'

import { log } from '../log'

test('simpleMovingAverage', () => {
  const actual = testData
  const input = 'close'
  const length = 14
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
    48.60714285714285,
    48.574999999999996,
    48.60928571428571,
    48.60857142857143,
    48.585714285714275,
    48.56571428571427,
    48.68071428571428,
    48.84714285714286,
    49.10714285714285,
    49.39142857142857,
    49.58928571428571,
    49.770714285714284,
    49.934285714285714,
    50.13785714285713,
    50.364999999999995,
    50.48000000000001,
    50.41428571428571,
    50.39714285714287,
    50.39142857142857,
    50.40857142857143,
  ]

  expect(simpleMovingAverage(actual, input, length)).toEqual(expected)
})
