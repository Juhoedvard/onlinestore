import { string, z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure
} from "~/server/api/trpc";

export const itemRouter = createTRPCRouter({

  getAll: publicProcedure.query(({ ctx }) => {
     return ctx.prisma.item.findMany({
      take: 50
     });

  }),
  getOne: publicProcedure
  .input(z.object({id: z.string() }))
  .query( async ({ctx, input}) => {
    return ctx.prisma.item.findUnique({
      where: {
        id: input.id
      }
    })
  }),

  getUserItems: protectedProcedure
  .query( async ({ctx}) => {
    return ctx.prisma.item.findMany({
      where:{
        userID: ctx.session.user.id
        },
      orderBy: [{ creationDay: "desc"}]
    })
  }),


  getSome: publicProcedure
  .input(z.object({product: z.string() }))
  .query(({ctx, input}) => {
    return ctx.prisma.item.findMany({
      where: {
        product: {
          startsWith: input.product,
          mode: "insensitive"
        }
      }
    })
  }),

  create: protectedProcedure
  .input(
      z.object({
        product: z.string().min(3, {message: 'Product name must be longer than 3 charecters'}).max(20, {}),
        price: z.number(),
        description: z.string().min(3, {message: 'Description needs to be more than 3 charecters long'}),
        image: string().nullish().catch( undefined)
      })
  )
  .mutation( async ({input, ctx }) => {
      const post = await ctx.prisma.item.create({
          data: {
              ...input,
              userID: ctx.session.user.id,


          }
      })

      return post
  }),

  addTocart: protectedProcedure
  .input(
      z.object({
        id: z.string(),
        buyerID: z.string(),
      })
  )
  .mutation( async ({input, ctx}) => {
      const addTocart = await ctx.prisma.item.update({
          where: {
              id: input.id
          },
          data: {
              buyerID: input.buyerID
          }
        })
        return addTocart
      }),

    getCart: protectedProcedure
      .query( async ({ctx}) => {
        return await ctx.prisma.item.findMany({
          where: {
            buyerID: ctx.session.user.id
          }
        })

      }),

    deleteFromCart: protectedProcedure
      .input(
        z.object({
          id: z.string()
        })
      )
      .mutation( async ({input, ctx}) => {
        return await ctx.prisma.item.update({
          where: {
            id: input.id
          },
          data: {
            buyerID: null
          }
        })
      }),

    updatePost: protectedProcedure
      .input(
        z.object({
          id: z.string(),
          product: z.string().min(3, {message: 'Product name must be longer than 3 charecters'}).max(20, {}),
          price: z.number(),
          description: z.string().min(3, {message: 'Description needs to be more than 3 charecters long'}),
          image: string().nullish().catch( undefined)
        })
      )
      .mutation( async ({input, ctx}) => {
        return await ctx.prisma.item.update({
          where: {
            id: input.id
          },
          data: {
            ...input
          }
        })
      }
      )





})
