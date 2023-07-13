
import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image from "next/image"
import { type Item } from "@prisma/client";
import Product from "../../../public/shoes.png";

const SearchPage: NextPage = () => {


    const router = useRouter()
    console.log(router.query.search)
    const { data: items} = api.item.getSome.useQuery({
        product: router.query.search as string
    },
    {
        enabled: !!router.query.search,
    })
    console.log(router.query.search)
    console.log(items)

    if(items?.length === 0 ){
        return <div>No results, try a different </div>
    }
    return(
        <div className="flex min-h-screen flex-col gap-10 bg-gradient-to-b items-center text-white bg-[#55656d]">
            <nav className="flex w-4/5 z-20 top-0  left-0 py-3 ">
                <Link href="/" className="a-link-normal  fixed a-color-tertiary">
                    Back to results
                </Link>
            </nav>
            <br></br>
            {items?.map((item: Item) => {
                return(
                    <div key={item.id}>
                        <h1 className="text-8xl">{item?.product}</h1>
                        <div className="flex gap-5">
                            <Image
                            src={Product}
                            width={400}
                            height={400}
                            alt=""
                            />
                            <div className=" flex flex-col gap-10">
                                <p>{item?.description}</p>
                                <p className=" border-t text-4xl">{item?.price} $</p>
                                <Link href={`/Item/${item.id}`}className="btn btn-accent">View</Link>
                            </div>
                     </div>
                    </div>
                    )})}
        </div>
    )
}


export default SearchPage