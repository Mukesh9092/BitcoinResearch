import { averageTrueRange } from './average-true-range'

import testData from './_data'

test('averageTrueRange', () => {
  const actual = testData
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
    null,
    1.085714285714287,
    1.0253061224489808,
    1.0113556851311964,
    0.9726874219075395,
    0.9717811774855726,
    0.93951109337946,
    0.9145460152809269,
    0.9720784427608606,
    0.945501411135085,
    0.9058227389111504,
    0.8654068289889256,
    0.8550206269182885,
    0.8618048678526967,
    0.9023902344346469,
    0.9686480748321721,
    0.9608874980584455,
    0.9615383910542707,
    0.9499999345503946,
    0.9521427963682233,
  ]

  expect(averageTrueRange(actual, length)).toEqual(expected)
})
