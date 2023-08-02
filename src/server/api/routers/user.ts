

import {z} from "zod"
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure
} from "~/server/api/trpc"


export const userRouter = createTRPCRouter({

    getAll : publicProcedure.query(({ ctx}) => {
        return ctx.prisma.user.findMany()
    }),

    getUser: protectedProcedure
        .query( async ({ctx}) => {
            return ctx.prisma.user.findUnique({
              where: {
                id: ctx.session.user.id
              }
            })
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

    setDelivery: protectedProcedure
     .input(
        z.object({
            city: z.string().min(2, {message: 'City name must be longer than 2 charecters'}).max(10, {}),
            address: z.string().min(5, {message: 'Address must be longer than 5 charecters'}).max(15, {}),
            postcode: z.string().min(5, {message: 'Zipcode must be atleast 5 charecters long'}).max(6, {}),
            postoffice: z.string().min(2, {message: 'Postoffice must be longer than 2 charecters'}).max(10, {})
        })
     ).mutation(async ({input, ctx}) => {
        const deliveryInfo = await ctx.prisma.user.update({
            where: {
                id: ctx.session.user.id
            },
            data: {
                ...input,
                deliveryInfo: true
            }
        })

        return deliveryInfo
     }),



})