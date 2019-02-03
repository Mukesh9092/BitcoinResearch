export const getDashboard = async (_, args, context, info) => {
  const result = await context.prisma.query.user(
    {
      data: {
        where: {
          id: context.userId,
        },
      },

      id
      name
      dashboard {
        id
        charts {
    id
    from
    to
    period
    market {
      id
      trader
      active
      category
      type
      base
      quote
      maker
      taker
      precisionBase
      precisionQuote
      precisionAmount
      precisionPrice
    }
  }
}
    },
    info,
  )

  return result[0]
}
