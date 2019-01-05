export default (_, args, context, info) => {
  return context.prisma.query.deleteChart({
    data: {
      where: {
        id: args.id,
      },
    },
  }, info)
}
