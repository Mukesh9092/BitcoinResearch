export const getMarkets = (_, args, context, info) => {
  return context.prisma.query.markets(
    {
      data: {
        where: {
          enabled: true,
        },
      },
    },
    info,
  )
}
