import { mean } from './mean'

import testData from './_data'

test('mean', () => {
  const input = 'close'
  const actual = testData.map((x) => x[input])
  const precision = 8
  const expected = 0.00085899

  expect(mean(actual, precision)).toEqual(expected)
})
