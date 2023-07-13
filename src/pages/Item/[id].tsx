import { type  NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import  Image  from "next/image";
import Product from "../../../public/shoes.png";
import Link from "next/link";


const ItemDetails: NextPage =  () => {

    const router = useRouter()
    const { data: post} = api.item.getOne.useQuery({
        id: router.query.id as string
    },
    {
        enabled: !!router.query.id,
    })
    return (
        <main className="flex min-h-screen flex-col gap-10 bg-gradient-to-b items-center text-white bg-[#55656d]">
            <nav className="flex w-4/5 z-20 top-0  left-0 py-3 ">
                <Link href="/" className="a-link-normal  fixed a-color-tertiary">
                    Back to results
                </Link>
            </nav>
            <br></br>
            <h1 className="text-8xl">{post?.product}</h1>
            <div className="flex gap-5">
                <Image
                src={Product}
                width={400}
                height={400}
                alt=""
                />
                <div className=" flex flex-col gap-10">
                    <p>{post?.description}</p>
                    <p className=" border-t text-4xl">{post?.price} $</p>
                    <button className="btn btn-accent">Button</button>
                </div>
            </div>
        </main>
    )
}




export default ItemDetails
