export async function deleteChart(root, args, context, info) {
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

  const result1 = await context.prisma.query.charts({})

  return result
}
