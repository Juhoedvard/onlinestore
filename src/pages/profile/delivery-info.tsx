/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import type { NextPage } from "next"
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loading } from "~/components/LoadingProfile";
import { SideNav } from "~/components/SideNav"
import { api } from "~/utils/api";


type DeliveryForm = {
    city: string;
    address: string;
    postcode: string;
    postoffice: string;
  }

const DeliveryInfo:NextPage = () => {


    const {  data: Session } = useSession();
    const ctx = api.useContext();
    const info = api.user.setDelivery.useMutation({
        onSuccess: () => {
         void  ctx.user.getAll.invalidate()}
    })
    console.log(Session?.user.id)
    const {data: user, isLoading } = api.user.getUser.useQuery()
    const [show, setShow] = useState(user?.deliveryInfo)
    const {register, handleSubmit} = useForm<DeliveryForm>();

    const onSubmit = (formData : DeliveryForm) => {
        info.mutateAsync({
            ...formData,
        })
        setShow(true)

    };


    if(isLoading) return(<Loading/>)
    console.log(user)
    return(
        <div className="flex gap-10 text-white bg-[#3a454b]">
            <SideNav/>
            {show === false ? (

                <form onSubmit={handleSubmit(onSubmit)}className="flex flex-col gap-10 w-2/3">
                    <h2 className="text-3xl py-4">Delivery info</h2>
                    <div className="flex w-1/2 p-4 ">
                        <div className="flex-1 flex-col gap-5 border-b ">
                            <input {...register("city", { required: true })} type="text" placeholder="City" className="input w-full max-w-xs"/>
                        </div>
                    </div>
                    <div className="flex w-1/2 p-4 ">
                        <div className="flex-1 gap-5 border-b">
                        <input {...register("address", { required: true })} type="text" placeholder="Home address" className="input w-full max-w-xs"/>
                        </div>
                    </div>
                    <div className="flex w-1/2 p-4 gap-6 ">
                        <div className="flex-1 gap-5 border-b">
                            <input {...register("postcode", { required: true })} type="text" placeholder="Zipcode" className="input w-full max-w-xs"/>
                        </div>
                        <div className="flex-1 gap-5 border-b">
                            <input {...register("postoffice", { required: true })} type="text" placeholder="Postoffice" className="input w-full max-w-xs"/>
                        </div>
                    </div>
                    <div className="flex p-4 w-1/2 gap-2">
                        <button className="btn btn-accent w-1/5" type="submit">Save</button>
                        <button onClick={() => setShow(true)} className="btn btn-accent w-1/5" type="button">Cancel</button>
                    </div>
                </form>
            ) : (
                <div className="flex flex-col gap-10 w-2/3">
                    <h2 className="text-3xl py-4">Delivery info</h2>
                    <div className="flex w-1/2 p-4 ">
                        <div className="flex-1 flex-col gap-5 p-2 border-b ">
                            <label>City: </label>
                            <p>{user?.city}</p>
                        </div>
                    </div>
                    <div className="flex w-1/2 p-4 ">
                        <div className="flex-1 flex-col gap-5 p-2 border-b">
                            <label>Home address: </label>
                            <p>{user?.address}</p>
                        </div>
                    </div>
                    <div className="flex w-1/2 p-4 gap-6 ">
                        <div className="flex-1 flex-col gap-5 p-2 border-b">
                        <label>Postal code: </label>
                            <p>{user?.postcode}</p>
                        </div>
                        <div className="flex-1 flex-col gap-5 p-2 border-b">
                        <label>Postal Office: </label>
                        <p>{user?.postoffice}</p>
                    </div>
                    </div>
                     <div className="flex w-1/2 p-4 gap-6">
                         <button onClick={() => setShow(false)} className="btn btn-neutral">Edit</button>
                     </div>
                </div>)}
        </div>

    )
}

export default DeliveryInfo