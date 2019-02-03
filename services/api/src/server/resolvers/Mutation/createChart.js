export const createChart = (_, args, context, info) => {
  console.log('createChart args', args)
  console.log('createChart info', info)

  return context.prisma.mutation.createChart(
    {
      data: {
        dashboard: {
          connect: {
            id: args.dashboardId,
          },
        },
        market: {
          connect: {
            id: args.marketId,
          },
        },
        from: args.from,
        to: args.to,
        period: args.period,
      },
    },
    info,
  )
}
