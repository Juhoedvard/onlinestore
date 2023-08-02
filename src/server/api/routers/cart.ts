
import {  z } from "zod";
import {
  createTRPCRouter,

  protectedProcedure
} from "~/server/api/trpc";

export const cartRouter = createTRPCRouter({


    getCart: protectedProcedure
        .query( async ({ctx}) => {
        const cart = await ctx.prisma.cart.findUnique({
            where: {
                userID: ctx.session.user.id
            }
        })
        if(!cart){
            return await ctx.prisma.cart.create({
                data: {
                    userID: ctx.session.user.id
                }
            })
        }
        else{
            return cart
        }
        }),

    addToCart: protectedProcedure
        .input(
            z.object({
                id: z.string()
            })
        )
        .mutation( async ({input, ctx}) => {
            return await ctx.prisma.cart.update({
                where: {
                    userID: ctx.session.user.id
                },
                data: {
                    Items: {
                        connect: {
                            id: input.id
                        }
                    }
                }
            })
        }
        ),
    removeFromCart: protectedProcedure
        .input(
            z.object({
                id: z.string()
            })
        )
        .mutation( async ({input, ctx}) => {
            const cart = await ctx.prisma.cart.update({
                where: {
                    userID: ctx.session.user.id
                },
                data: {
                    Items: {
                        disconnect: {
                            id: input.id
                        }
                    }
                }
            })
            return cart
        }),


});