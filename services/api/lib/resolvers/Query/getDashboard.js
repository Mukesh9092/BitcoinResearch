export default async (_parent, _args, context, info) => {
    const result = await context.prisma.query.user({
        data: {
            where: {
                id: context.userId,
            },
        },
    }, info);
    return result[0];
};
