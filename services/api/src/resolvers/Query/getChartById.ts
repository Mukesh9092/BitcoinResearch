export default async (_parent: any, args: any, context: any, info: any) => {
  const result = await context.prisma.query.chart(
    {
      where: {
        id: args.id,
      },
    },
    info,
  )

  return result
}
