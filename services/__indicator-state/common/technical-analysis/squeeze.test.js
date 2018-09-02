import { squeeze } from './squeeze'

import testData from './_data'

import { log } from '../log'

test('Squeeze', () => {
  const actual = testData
  const input = 'close'
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
    squeeze(
      actual,
      input,
      bbLength,
      bbMultiplier,
      kcLength,
      kcAtrLength,
      kcAtrMultiplier,
    ),
  ).toEqual(expected)
})
