export default async (_parent: any, _args: any, context: any, info: any) => {
  const result = await context.prisma.query.users(
    {
      data: {
        where: {
          name: 'admin',
        },
      },
    },
    info,
  )

  return result[0]
}
