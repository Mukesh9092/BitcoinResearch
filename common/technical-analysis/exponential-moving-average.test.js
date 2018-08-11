import { exponentialMovingAverage } from './exponential-moving-average'

import testData from './_data'

import { log } from '../log'

test('exponentialMovingAverage', () => {
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
    48.63901792858947,
    48.53803020627709,
    48.589652961335695,
    48.7110449276735,
    48.83715529550051,
    48.69256878652005,
    48.7613202244527,
    48.825528206522044,
    48.94695427555797,
    49.48302168448994,
    49.725768361348145,
    49.947467726578935,
    50.11513251577712,
    50.12904480030566,
    50.43409263884256,
    50.66249215460634,
    50.56926411111296,
    50.25579774655493,
    50.15016604101611,
    50.113974558383816,
  ]

  expect(exponentialMovingAverage(actual, input, length)).toEqual(expected)
})
