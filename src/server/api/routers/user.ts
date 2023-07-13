

import {z} from "zod"
import {
    createTRPCRouter,
    publicProcedure
} from "~/server/api/trpc"


export const userRouter = createTRPCRouter({

    getAll : publicProcedure.query(({ ctx}) => {
        return ctx.prisma.user.findMany()
    }),

    create: publicProcedure
    .input(
        z.object({
            name: z.string(),
            password: z.string(),
            email: z.string()

        })
    ).mutation( async ({input, ctx }) => {
        const user = await ctx.prisma.user.create({
            data: {
                ...input
            }
        })

        return user
    }),

})