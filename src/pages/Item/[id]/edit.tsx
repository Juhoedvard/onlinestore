/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */

import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Loading } from "~/components/LoadingProfile";
import Link from "next/link";

type Item = {
    id: string;
    product: string
    price: string;
    description: string;
    image: string;
};

const EditItem: NextPage = () => {


    const {register, handleSubmit} = useForm<Item>();
    const ctx = api.useContext()
    const router = useRouter()
    const {data: Item, isLoading} = api.item.getOne.useQuery({
        id: router.query.id as string
    })
    console.log(Item)
    const updatePost = api.item.updatePost.useMutation({
        onSuccess: () => {
            void ctx.item.getOne.invalidate();
            toast.success("Post updated");
            router.push(`/Item/${Item!.id}`)
        }
    })
    if(Item == null) return( <div>Something went wrong</div>)
    const onSubmit = (formData : Item) => {
        void updatePost.mutateAsync({
            id: Item.id,
            product: formData.product || Item.product,
            price: parseFloat(formData.price) || (Item.price),
            description: formData.description || Item.description,
        })
    }

    if(isLoading) return(<Loading/>)

    return(
        <form onSubmit={handleSubmit(onSubmit)} className=" flex gap-4 justify-center items-center min-h-screen md:h-auto bg-gradient-to-b  text-white bg-[#55656d] ">
            <div className="flex flex-col gap-4 items-center justify-center ">
                <h2 className="align-middle text-xl bold ">Edit post: {Item.product}</h2>
                <label>Product name: </label>
                <input {...register("product", { required: false})} type="text" placeholder={`${Item.product}`} className="input input-bordered w-full max-w-xs"/>
                <label>Price: </label>
                <input {...register("price", { required: false })} type="number"   step="0,01" placeholder={`${Item.price}`} className="input input-bordered w-full max-w-xs" />
                <label>Description: </label>
                <textarea {...register("description", { required: false, })}  placeholder={`${Item.description || "Description"} `}className="input input-bordered h-20 w-full max-w-xs"/>
                <label>Image: </label>
                <input type="file" className="input input-bordered w-full max-w-xs"/>
                <div className="flex justify-end items-end gap-2 w-1/2">
                    <button className="btn btn-accent w-20" type="submit">Save</button>
                    <Link href={`/Item/${Item.id}`}className="btn btn-neutral w-20">Cancel</Link>
                </div>
            </div>
    </form>
    )
}



export default EditItem