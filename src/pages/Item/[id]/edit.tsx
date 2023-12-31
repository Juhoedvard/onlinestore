/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */

import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Loading } from "~/components/LoadingProfile";
import Link from "next/link";
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "~/server/api/uploadthing";
import { useState } from "react";
import "@uploadthing/react/styles.css";



type Item = {
    id: string;
    product: string
    price: string;
    description: string;
    image?: string | undefined;
};

const EditItem: NextPage = () => {


    const {register, handleSubmit} = useForm<Item>();
    const ctx = api.useContext()
    const router = useRouter()
    const [image, setImage] = useState<{
        fileUrl: string;
        fileKey: string;
      }[]>([]);
    const {data: post, isLoading} = api.item.getOne.useQuery({
        id: router.query.id as string
    })

    const {mutate, isLoading : loadingItem} = api.item.updatePost.useMutation({
        onSuccess: () => {
            void ctx.item.getOne.invalidate();
            toast.success("Post updated");
            router.push(`/Item/${post!.id}`)
        }
    })
    if(post == null) return( <div>Something went wrong</div>)
    const onSubmit = (formData : Item) => {
        void mutate({
            id: post.id,
            product: formData.product || post.product,
            price: parseFloat(formData.price) || post.price,
            description: formData.description || post.description,
            image: image[0]?.fileUrl || post.image
        })
    }

    if(isLoading) return(<Loading/>)

    return(
            <form onSubmit={handleSubmit(onSubmit)} className=" flex gap-4 justify-center items-center min-h-screen md:h-auto bg-gradient-to-b  text-white bg-[#55656d] ">
            <div className="flex flex-col gap-4 items-center justify-center ">
                <h2 className="align-middle text-xl bold ">Edit post: {post.product}</h2>
                <label>Product name: </label>
                <input {...register("product", { required: false})} type="text" placeholder={`${post.product}`} className="input input-bordered w-full max-w-xs"/>
                <label>Price: </label>
                <input {...register("price", { required: false })} type="number"   step="0,01" placeholder={`${post.price}`} className="input input-bordered w-full max-w-xs" />
                <label>Description: </label>
                <textarea {...register("description", { required: false, })}  placeholder={`${post.description || "Description"} `}className="input input-bordered h-20 w-full max-w-xs"/>
                <label>Image: </label>
                <UploadDropzone<OurFileRouter>
                    endpoint="strictImageAttachment"
                    onClientUploadComplete={(res) => {
                    if(res){
                        setImage(res);
                        toast.success("Upload Completed");}
                    }}
                    onUploadError={(error: Error) => {
                    // Do something with the error.
                    toast.error(`ERROR! ${error.message}`);
                    }}
                />
                <div className="flex justify-center gap-4 w-1/2">
                    <Link href={`/Item/${post.id}`}className="btn btn-neutral w-20">Cancel</Link>
                    <button className="btn btn-accent w-20" type="submit" disabled={loadingItem}>Save</button>
                </div>
                <br></br>
            </div>

        </form>

    )
}



export default EditItem