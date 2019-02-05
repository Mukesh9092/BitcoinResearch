import { debug } from '../../../common/log'

export const deleteChart = (_, args, context, info) => {
  // debug('deleteChart args', args)
  // debug('deleteChart context', context)
  // debug('deleteChart info', info)

  return context.prisma.mutation.deleteChart(
    {
      data: {
        where: {
          id: args.chartId,
        },
      },
    },
    info,
  )
}
