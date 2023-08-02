/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */

import Link from "next/link"
import type { NextPage } from "next/types"
import { api } from "~/utils/api"
import { type Item } from "@prisma/client";
import Image from "next/image"
import { toast } from "react-toastify";
import noImage from "../../public/noImage.jpg"
import { signIn, useSession } from "next-auth/react";
import getStripe from "~/utils/get-stripe";



const Cart:NextPage = () => {

    const ctx = api.useContext()
    const createCheckout = api.payment.createCheckout.useMutation()
    const stripePromise = getStripe()

    async function checkout() {
        const response = await createCheckout.mutateAsync();
        const stripe = await stripePromise
        if(stripe !== null){
            await stripe.redirectToCheckout({
                sessionId: response.id,
            });
        }

    }
    const {data: cart} = api.cart.getCart.useQuery()
    const {data: cartItems, isLoading} = api.item.getCartItems.useQuery({
        cartId: cart?.id as string
    },
    {
        enabled: !!cart?.id,
    })
    useSession({
        required: true,
        onUnauthenticated() {
            toast.error("You must be logged in to see your cart")
            void signIn()
        }
    })
    const {mutate: removeFromCart} = api.cart.removeFromCart.useMutation({
        onSuccess: () => {
            void ctx.cart.getCart.invalidate()
            void ctx.item.getCartItems.invalidate()
            toast.success("Removed from cart")
        },
        onError: () => {
            toast.error("Something went wrong")
        }

    })
    let total = 0


    if(isLoading) return <div>loading...</div>
    return (
        <div className="flex min-h-screen w-full flex-col gap-10 bg-gradient-to-b  text-white bg-[#55656d]">
            <nav className="flex w-4/5 z-20 top-0 left-0 py-3 px-10">
                <Link href="/" className="a-link-normal  fixed a-color-tertiary">
                    Back to Home
                </Link>
            </nav>
            <br></br>

            <div className="flex justify-center items-center gap-5">
                <div className="flex flex-col gap-5 w-full items-center">
              {cartItems?.map((item : Item) => {
                    total = total + item.price
                    return(
                        <div key={item.id} className="flex flex-row w-2/3 rounded-lg bg-base-100 shadow-xl justify-self-center p-4 translate-y-3 gap-10 justify-between px-10 ">
                                <div className="flex flex-1 flex-col py-3 justify-between "  >
                                        <dt>{item.product}</dt>
                                        <dd className="text-sm">Price: {item.price} $</dd>
                                </div>
                                <div className="flex flex-1 flex-col py-3 justify-between">
                                    <dt >Description: </dt>
                                    <dd className="text-sm">{item.description}</dd>
                                </div>
                                <figure className="h-1/2 m-4">
                                {item.image ?
                                    <Image
                                        loader={() => item.image || ''}
                                        src={item.image || noImage}
                                        width={100}
                                        height={100}
                                        alt=""
                                    /> :
                                    <Image
                                        src={noImage}
                                        width={100}
                                        height={100}
                                        alt=""/>}
                                </figure>
                                <div className="flex flex-col items center justify-center">
                                     <button onClick={() => removeFromCart({id: item.id})} className="btn btn-ghost">Remove</button>
                                </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-col gap-5 w-full items-center ">
                <div className="flex flex-col w-2/3 h-full rounded-lg bg-base-100 shadow-xl p-4 translate-y-3 gap-10 ">
                    <h1 className="text-xl">Order summary</h1>
                    <div className="flex justify-between ">
                        <dt className="text-lg">Subtotal</dt>
                        <dd className="mt-1 ">{total} $</dd>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-slate-200">
                        <dt className="text-lg">Shipping</dt>
                        <dd className="mt-1 ">0 $</dd>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-slate-200">
                        <dt className="text-lg">Order total</dt>
                        <dd className="mt-1 ">{total} $</dd>
                    </div>
                    <div>
                        <button className="btn btn-primary w-full" onClick={(() => checkout().catch(console.error))}>Checkout</button>
                    </div>
                </div>
            </div>
              </div>
              <br></br>
            </div>
    )
}


export default Cart
