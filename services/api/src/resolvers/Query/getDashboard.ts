export default async (_parent: any, _args: any, context: any, info: any) => {
  const result = await context.prisma.query.user(
    {
      data: {
        where: {
          id: context.userId,
        },
      },
    },
    info,
  )

  return result[0]
}
