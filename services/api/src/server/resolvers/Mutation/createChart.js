export default (_, args, context, info) => {
  return context.prisma.query.createChart({
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
  }, info)
}
