import gql from 'graphql-tag'

import { stripWhiteSpace } from '../../string'

function getId() {
  return Math.random()
    .toString(36)
    .substr(2, 25)
}

export function createUpsertOHLCVs(ohlcvs) {
  console.log('createUpsertOHLCVs', ohlcvs.length)

  const sqlQuery = ohlcvs
    .map((options) => {
      const id = getId()
      const now = new Date().toISOString()
      const [timestamp, marketBase, marketQuote, period, open, high, low, close, volume] = options

      const template = stripWhiteSpace(`
        INSERT INTO \\"default$default\\".\\"OHLCV\\"
        VALUES (
          '${id}',
          '${new Date(timestamp).toISOString()}',
          '${marketBase}',
          '${marketQuote}',
          ${open},
          ${high},
          ${low},
          ${close},
          ${volume},
          '${now}',
          '${now}',
          ${period}
        )
        ON CONFLICT ON CONSTRAINT \\"ohlcv_unique\\"
        DO UPDATE SET
          \\"open\\" = ${open},
          \\"high\\" = ${high},
          \\"low\\" = ${low},
          \\"close\\" = ${close},
          \\"volume\\" = ${volume};
      `)

      console.log('template', template)

      return template
    })
    .join('')

  const graphqlQuery = stripWhiteSpace(`mutation { executeRaw(query: "${sqlQuery}") }`)

  console.log('graphqlQuery', graphqlQuery)

  return gql(graphqlQuery)
}
