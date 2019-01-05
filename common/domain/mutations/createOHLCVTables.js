import gql from 'graphql-tag'

import { stripWhiteSpace } from '../../string'

function getId() {
  return Math.random()
    .toString(36)
    .substr(2, 25)
}

export function createOHLCVTables(names) {
  console.log('createOHLCVTables', names)

  const sqlQuery = names
    .map((name) => {
      const id = getId()
      const now = new Date().toISOString()

      const template = stripWhiteSpace(`
        CREATE TABLE IF NOT EXISTS \\"default$default\\".\\"OHLCV_${marketQuote}_${marketBase}_${period}\\" (
          id character varying(25) COLLATE pg_catalog."default" NOT NULL,
          datetime timestamp(3) without time zone NOT NULL,
          "marketBase" text COLLATE pg_catalog."default" NOT NULL,
          "marketQuote" text COLLATE pg_catalog."default" NOT NULL,
          period text COLLATE pg_catalog."default" NOT NULL,
          open numeric(65,30) NOT NULL,
          high numeric(65,30) NOT NULL,
          low numeric(65,30) NOT NULL,
          close numeric(65,30) NOT NULL,
          volume numeric(65,30) NOT NULL,
          "updatedAt" timestamp(3) without time zone NOT NULL,
          "createdAt" timestamp(3) without time zone NOT NULL,
          CONSTRAINT "OHLCV_pkey" PRIMARY KEY (id)
        )



        INSERT INTO \\"default$default\\".\\"\\"
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

      return template
    })
    .join('')

  const graphqlQuery = stripWhiteSpace(`mutation { executeRaw(query: "${sqlQuery}") }`)

  console.log('graphqlQuery', graphqlQuery)

  return gql(graphqlQuery)
}
