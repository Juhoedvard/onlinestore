/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
"useClient"

import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "~/server/api/uploadthing";
import "@uploadthing/react/styles.css";
import Image from "next/image";

type CreatePostForm = {
    product: string;
    price: string;
    description: string;
    image?: string |undefined;
  }

export default function CreatePost() {

    const router = useRouter();
    const ctx = api.useContext();
    const [image, setImage] = useState<{
      fileUrl: string;
      fileKey: string;
    }[]>([]);
    const {mutate, isLoading} = api.item.create.useMutation({
      onSuccess: () => {
        void ctx.item.getAll.invalidate()
        toast.success("New post created")
        router.push("/");
      },
      onError: (e) => {
        const error = e.data?.zodError?.fieldErrors;
        (error)
        if (error) {
          Object.entries(error).forEach(([key, value]) => {
            toast.error(`${key}: ${value}`);
          });
        }
        else{
          toast.error("Something went wrong")
        }

      }
    });

    const {register, handleSubmit} = useForm<CreatePostForm>();
    const { data: user } = useSession({
      required: true
    });

    const onSubmit =  (formData: CreatePostForm) => {
      ("clicked")
      (formData.image, "formdata")
      mutate({
        ...formData,
        price: parseFloat(formData.price),
        image: image[0]?.fileUrl
        })
    };


    if(!user) {
      return null
    }
    return(
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form onSubmit={handleSubmit(onSubmit)} className=" flex gap-4 justify-center items-center min-h-screen md:h-auto bg-gradient-to-b bg-[#55656d] text-white ">
          <div className="flex flex-col gap-4 items-center justify-center ">
            <h2 className="align-middle text-xl bold ">Create a new post</h2>
            <label>Product name: </label>
            <input {...register("product", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"/>
            <label>Price: </label>
            <input {...register("price", { required: true })} type="number"   step="0,01" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <label>Description: </label>
            <textarea {...register("description", { required: false, })}  placeholder="Type here" className="input input-bordered w-full max-w-xs"/>
            <label>Image: </label>
            {!image[0]?.fileUrl ?<UploadDropzone<OurFileRouter>
              endpoint="strictImageAttachment"
              onClientUploadComplete={(res) => {
              if(res){
                setImage(res)
              // Do something with the response
              ("Files: ", res);
              toast.success("Upload Completed");}
              }}
              onUploadError={(error: Error) => {
              // Do something with the error.
              toast.error(`ERROR! ${error.message}`);
              }}
            /> : <Image
            loader={() => image[0]!.fileUrl}
            src={image[0]!.fileUrl}
            width={300}
            height={300}
            alt=""
        />}
            <div className="flex gap-2">
              <Link href="/" className="btn btn-sm neutral"> Cancel</Link>
              <button className="btn btn-sm btn-success" type="submit" disabled={isLoading}>Create</button>
            </div>
            <br></br>
          </div>
      </form>
    )
  }

