/* eslint-disable @typescript-eslint/no-floating-promises */
import { type NextPage } from "next";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";




type CreatePostForm = {
    product: string;
    price: string;
    description: string;
    image: string;
  }

const CreatePost: NextPage = () =>{


    const router = useRouter();
    const ctx = api.useContext();
    const post = api.item.create.useMutation({
      onSuccess: () => {
        void ctx.item.getAll.invalidate()
        .then(() => {
          router.push("/");
          setImage('')
        })
      }
    });
    const [image, setImage] = useState<string>('');
    const {register, handleSubmit} = useForm<CreatePostForm>();
    const { data: user } = useSession({
      required: true
    });

    const onSubmit =  (formData: CreatePostForm) => {
      console.log(formData.image, "formdata")
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      post.mutateAsync({
        ...formData,
        price: parseFloat(formData.price),
        image: image
        })
    };
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      console.log(e.target.value)
      setImage(e.target.value)
    }

    if(!user) {
      return null
    }
    return(
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form onSubmit={handleSubmit(onSubmit)} className=" flex gap-4 justify-center items-center min-h-screen md:h-auto bg-gradient-to-b bg-[#3a454b] text-white ">
          <div className="flex flex-col gap-4 items-center justify-center ">
            <h2 className="align-middle text-xl bold ">Create a new post</h2>
            <label>Product name: </label>
            <input {...register("product", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"/>
            <label>Price: </label>
            <input {...register("price", { required: true })} type="number"   step="0,01" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <label>Description: </label>
            <textarea {...register("description", { required: true, })}  placeholder="Type here" className="input input-bordered w-full max-w-xs"/>
            <label>Image: </label>
            <input  onChange={(e) => handleImage(e)} type="file" className="input input-bordered w-full max-w-xs"/>
            <button className="btn btn-sm btn-success" type="submit">Create</button>
          </div>
      </form>
    )
  }

export default CreatePost