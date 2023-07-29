
import { createTRPCRouter } from "~/server/api/trpc";
import { itemRouter } from "~/server/api/routers/item";
import { userRouter } from "./routers/user";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  item: itemRouter,
  user: userRouter,

});

// export type definition of API
export type AppRouter = typeof appRouter;
