export default async (_root: any, args: any, context: any, info: any) => {
  const options = {
    data: {
      where: {
        id: args.chartId,
      },
    },
  }

  console.log('deleteChart options', options)

  const result = await context.prisma.mutation.deleteChart(options, info)

  console.log('deleteChart result', result)

  return result
}
