export const createChart = (_, args, context, info) => {
  return context.prisma.mutation.createChart(
    {
      data: {
        dashboard: {
          connect: {
            id: args.dashboardId,
          },
        },
        base: args.base,
        quote: args.quote,
        from: args.from,
        to: args.to,
        period: args.period,
      },
    },
    info,
  )
}
