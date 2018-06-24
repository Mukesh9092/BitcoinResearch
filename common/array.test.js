import { ensureArray, pluck } from './array'

import { log } from './log'
// log.setLevel('debug')

test('ensureArray / With no array', () => {
  const actual = 1
  const expected = [1]

  expect(ensureArray(actual)).toEqual(expected)
})

test('ensureArray / With an array', () => {
  const actual = [1]
  const expected = [1]

  expect(ensureArray(actual)).toEqual(expected)
})

test('ensureArray / With an array with an array', () => {
  const actual = [[]]
  const expected = [[]]

  expect(ensureArray(actual)).toEqual(expected)
})

test('pluck / With no array', () => {
  const array = 1
  const selector = 'hmm'

  expect(() => {
    pluck(array, selector)
  }).toThrow()
})

test('pluck / With no selector', () => {
  const array = [
    {
      a: 1,
    },
  ]
  const selector = undefined

  expect(() => {
    pluck((array, selector))
  }).toThrow()
})

test('pluck / With an empty array', () => {
  const array = []
  const selector = 'x'
  const expected = []

  expect(pluck(array, selector)).toEqual(expected)
})

test('pluck / With an array with an element that is not an object', () => {
  const array = [{ a: 1 }, 4, { a: 1 }]
  const selector = 'a'
  const expected = [1, undefined, 1]

  expect(pluck(array, selector)).toEqual(expected)
})

test('pluck / With an array with objects with an element with no property that is the selector', () => {
  const array = [{ a: 1 }, { b: 1 }, { a: 1 }]
  const selector = 'a'
  const expected = [1, undefined, 1]

  expect(pluck(array, selector)).toEqual(expected)
})

test('pluck / With an array with objects all with a property that is the selector', () => {
  const array = [{ a: 1 }, { a: 1 }, { a: 1 }]
  const selector = 'a'
  const expected = [1, 1, 1]

  expect(pluck(array, selector)).toEqual(expected)
})
