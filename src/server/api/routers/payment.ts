import Stripe from "stripe";
import { string, z } from "zod";
import { env } from "~/env.mjs";
import {
  createTRPCRouter,

  protectedProcedure
} from "~/server/api/trpc";


export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
  typescript: true,
});
export const paymentRouter = createTRPCRouter({


    createCheckout: protectedProcedure
        .mutation(() => {
            return stripe.checkout.sessions.create({
                mode: "payment",
                payment_method_types: ["card"],
                line_items: [
                    {
                        price: env.STRIPE_PRICE_ID,
                        quantity: 1,
                    },
                ],
                success_url: `${env.NEXTAUTH_URL}`,
                cancel_url: `${env.NEXTAUTH_URL}/cart`,
        })
    }),
    getStripeSession: protectedProcedure
        .input(z.object({
            sessionID: string()
        })
        )
        .query(async ({input}) => {
            const session = await stripe.checkout.sessions.retrieve(input.sessionID)
            return{
                email: session.customer_details?.email,
            }
        })
})