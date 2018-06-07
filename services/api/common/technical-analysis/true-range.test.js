import { trueRange } from './true-range'

test('trueRange / Empty array', () => {
  const actual = []
  const expected = NaN

  expect(trueRange(actual)).toEqual(expected)
})

test('trueRange / Array with one OHLC object', () => {
  const actual = [
    {
      open: 0,
      high: 75,
      low: 25,
      close: 100,
    },
  ]

  const expected = 50

  expect(trueRange(actual)).toEqual(expected)
})

test('trueRange / Array with more then one OHLC object', () => {
  const actual = [
    {
      open: 0,
      high: 75,
      low: 25,
      close: 100,
    },
    {
      open: 100,
      high: 120,
      low: 110,
      close: 130,
    },
  ]

  const expected = 20

  expect(trueRange(actual)).toEqual(expected)
})
