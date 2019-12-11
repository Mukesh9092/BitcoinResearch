export default async (_parent, args, context, info) => {
    const result = await context.prisma.query.chart({
        where: {
            id: args.id,
        },
    }, info);
    return result;
};
