export default async (_parent: any, _args: any, context: any, info: any) => {
  try {
    console.log('getDashboard')

    const result = await context.prisma.query.dashboard(
      {
        data: {
          where: {
            user: context.userId,
          },
        },
      },
      info,
    )

    console.log('getDashboard:result', result)

    return result[0]
  } catch (error) {
    console.error(error)
  }
}
