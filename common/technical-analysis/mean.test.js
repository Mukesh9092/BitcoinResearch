import { log } from '../log'

import { mean } from './mean'

import testData from './_data'

log.setLevel('debug')

test('mean', () => {
  const input = 'close'
  const actual = testData.map((x) => {
    return x[input]
  })
  const precision = 8
  const expected = 0.00085899

  expect(mean(actual, precision)).toEqual(expected)
})
