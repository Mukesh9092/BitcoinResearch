import { strategy } from './strategy'

import testData from './_data'

import { log } from '../log'

test('Strategy', () => {
  const actual = testData
  const input = 'close'
  const emaShortLength = 7
  const emaLongLength = 14
  const bbLength = 14
  const bbMultiplier = 2
  const kcLength = 14
  const kcAtrLength = 7
  const kcAtrMultiplier = 2
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
    false,
    true,
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
  ]

  expect(
    strategy(
      actual,
      input,
      emaShortLength,
      emaLongLength,
      bbLength,
      bbMultiplier,
      kcLength,
      kcAtrLength,
      kcAtrMultiplier,
    ),
  ).toEqual(expected)
})
