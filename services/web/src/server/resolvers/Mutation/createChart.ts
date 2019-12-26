export default async (_parent: any, args: any, context: any, info: any) => {
  const options = {
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
  }

  console.log('createChart options', options)

  const result = await context.prisma.mutation.createChart(options, info)

  console.log('createChart result', result)

  return result
}
