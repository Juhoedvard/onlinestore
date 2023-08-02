
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "~/utils/api";



const Success: NextPage = () => {

    const router = useRouter();
    const sessionID = router.query.session_id as string;


    const session = api.payment.getStripeSession.useQuery({
        sessionID
    },
    {
        enabled: !!sessionID,
    })

    useEffect(() => {
        if(session.data?.email){
            toast.success('Payment successful')
            router.push('/cart').catch(console.error)
        }
    }, [session.data, router])

    return (

        <>
            <div>{toast.success('Payment successfull')}</div>
        </>
    )
}

export default Success