import { standardDeviation } from './standard-deviation'

import testData from './_data'

test('standardDeviation', () => {
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
    0.8038601923165553,
    0.7993723499384716,
    0.8202482202706344,
    0.8196984168006513,
    0.8007757228099249,
    0.7716188206592707,
    0.8966044002509974,
    1.0462491876400015,
    1.1416818132200248,
    0.9708826843719008,
    0.9935829823709459,
    1.0620188632665934,
    1.1283665135987462,
    1.207019078119752,
    1.0668627624236184,
    0.9241045561889797,
    1.040604220084247,
    1.0640375106996105,
    1.071956207076628,
    1.0584375795908376,
  ]

  expect(standardDeviation(actual, input, length)).toEqual(expected)
})
