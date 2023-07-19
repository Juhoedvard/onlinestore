import { type  NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import  Image  from "next/image";
import Product from "../../../public/shoes.png";
import Link from "next/link";
import { Loading } from "~/components/LoadingProfile";


const ItemDetails: NextPage =  () => {

    const router = useRouter()
    const { data: post, isLoading} = api.item.getOne.useQuery({
        id: router.query.id as string
    },
    {
        enabled: !!router.query.id,
    })

    if( isLoading) return (<Loading/>)

    return (
        <main className="flex min-h-screen flex-col gap-10 bg-gradient-to-b items-center  text-white bg-[#55656d]">
            <nav className="flex w-4/5 z-20 top-0  left-0 py-3 ">
                <Link href="/" className="a-link-normal  fixed a-color-tertiary">
                    Back to results
                </Link>
            </nav>
            <br></br>
            <div className="place-self-auto w-2/3 ">
                <h1 className="text-6xl m-4 border-b p-2 text-center place-self-start ">{post?.product}</h1>
            </div>
            <div className="flex w-full h-full justify-center items-stretch gap-3">
                 <Image
                        className="items-stretch"
                        src={Product}
                        width={500}
                        height={400}
                        alt=""
                        />
                <div className="flex flex-col w-1/4">
                        <div className="h-2/3 items-center bg-[#434f55] rounded-xl display: block ">
                            <h2 className="p-4 ">Description: </h2>
                            <div className="p-4 whitespace-normal display: block ">{post?.description}</div>
                        </div>
                        <div className="flex flex-col">
                            <p className="  text-4xl text-center p-4">{post?.price} $</p>
                            <button className="btn btn-accent ">Buy</button>
                        </div>
                </div>
            </div>
        </main>
    )
}




export default ItemDetails
