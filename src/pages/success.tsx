
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "~/utils/api";



const Success: NextPage = () => {

    const router = useRouter();
    const sessionID = router.query.session_id as string;

    const clearCart = api.item.soldItem.useMutation()

    const session = api.payment.getStripeSession.useQuery({
        sessionID
    },
    {
        enabled: !!sessionID,
    })

    useEffect(() => {
        if(session.data?.email){
            clearCart.mutate()
            setTimeout(() => {
              router.push('/cart').catch(console.error)
            }, 5000)
        }
    }, [session.data, router])

    return (

        <>
             <div className="flex min-h-screen w-full flex-col gap-10 bg-gradient-to-b items-center justify-center  text-white bg-[#55656d]">
                <h2 className="text-2xl text-green-300">Payment successfull</h2>
                <div className="flex flex-col w-full h-full justify-center items-center">

                    <Link href="/" className="a-link-normal  fixed a-color-tertiary" >Back to the store</Link>
                </div>

             </div>
        </>
    )
}

export default Success