export const deleteChart = (_, args, context, info) => {
  return context.prisma.mutation.deleteChart(
    {
      data: {
        where: {
          id: args.id,
        },
      },
    },
    info,
  )
}
