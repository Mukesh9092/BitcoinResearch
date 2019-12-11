export default async (_parent, _args, context, info) => {
    const result = await context.prisma.query.users({
        data: {
            where: {
                name: 'admin',
            },
        },
    }, info);
    return result[0];
};
