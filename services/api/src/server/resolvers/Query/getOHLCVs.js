import gql from 'graphql-tag'

export default (_, args, context, info) => {
  const tableName = `OHLCV_${context.marketQuote}_${context.marketBase}_${context.period}`

  const graphqlQuery = stripWhiteSpace(`mutation { executeRaw(query: "${sqlQuery}") }`)

  return context.prisma.query.OHLCVs({
    data: {
      where: {
        marketBase: args.marketBase,
        marketQuote: args.marketQuote,
        period: args.period,
        timestamp_gte: args.from,
        timestamp_lte: args.to,
      },
    },
  }, info)
}
