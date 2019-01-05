export default (_, args, context, info) => {
  return context.prisma.query.markets({}, info)
}
