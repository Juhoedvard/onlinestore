/* eslint-disable @typescript-eslint/no-misused-promises */

import Link from "next/link"
import type { NextPage } from "next/types"
import { api } from "~/utils/api"
import { type Item } from "@prisma/client";
import Image from "next/image"
import Product from "../../public/shoes.png";
import { toast } from "react-toastify";



const Cart:NextPage = () => {

    const {data: cart, isLoading} = api.item.getCart.useQuery()
    const ctx = api.useContext()

    const remove = api.item.deleteFromCart.useMutation({
        onSuccess: () => {
            void ctx.item.getCart.invalidate()
            toast.success("Item removed from cart")
        }
    })

    const removeFromCart = async (id: string) => {
        await remove.mutateAsync({
            id: id
        })
    }
    if(isLoading) return <div>loading...</div>
    return (
        <div className="flex min-h-screen w-full flex-col gap-10 bg-gradient-to-b  text-white bg-[#55656d]">
            <nav className="flex w-4/5 z-20 top-0 left-0 py-3 px-10">
                <Link href="/" className="a-link-normal  fixed a-color-tertiary">
                    Back to Home
                </Link>
            </nav>
            <br></br>
            <div className="flex flex-col justify-center items-center gap-5">
              <h1 className="text-2xl  ">
                 <span>Your cart:  </span>
              </h1>
                {cart?.map((item : Item) => {
                    return(
                        <div key={item.id} className="flex flex-row w-2/3 rounded-lg bg-base-100 shadow-xl justify-self-center p-4 translate-y-3 gap-10 justify-between px-10 ">
                                <div className="flex-1 h-35 flex-col gap-10 justify-between" >
                                        <h2 className="text-xl">{item.product}</h2>
                                        <p>{item.price} $</p>
                                </div>
                                <div className="flex-1 flex-col gap-5">
                                    <h2>Description: </h2>
                                    <span>{item.description}</span>
                                </div>
                                <figure>
                                    <Image
                                        src={Product}
                                        width={200}
                                        height={200}
                                        alt=""/>
                                </figure>
                                <div className="flex flex-col items center justify-center">
                                     <button onClick={() => removeFromCart(item.id)} className="btn btn-ghost">Remove</button>
                                </div>
                        </div>
                    )
                })}
              </div>
            </div>
    )
}


export default Cart