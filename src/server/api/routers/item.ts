import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const itemRouter = createTRPCRouter({

  getAll: publicProcedure.query(({ ctx }) => {
     return ctx.prisma.item.findMany();

  }),


});
