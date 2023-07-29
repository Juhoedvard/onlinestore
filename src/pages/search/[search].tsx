/* eslint-disable react/no-unescaped-entities */
"use client"

import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image from "next/image"
import { type Item } from "@prisma/client";
import noImage from "../../../public/noImage.jpg"

export default function SearchPage ()  {

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
            <h1 className="text-2xl"> <span>Search results for  "{router.query.search}" :</span></h1>
            <br></br>
            {items?.map((item: Item) => {
                return(
                    <div key={item.id}className="flex max-w-screen-2xl h-full justify-center items-stretch gap-10 static ">
                     {item.image ?
                      <Image
                          loader={() => item.image || ''}
                          src={item.image}
                          width={300}
                          height={300}
                          alt=""
                      /> :
                      <Image
                          src={noImage}
                          width={300}
                          height={300}
                          alt=""/>}
                   <div className="flex flex-col w-1/3">
                           <div className="h-2/3 w-80 items-center  bg-[#434f55] rounded-xl">
                               <h2 className="p-4 ">Description: </h2>
                               <div className="p-4 whitespace-pre-line ">{item?.description}</div>
                           </div>
                           <div className="flex flex-col w-80">
                               <p className="  text-4xl text-center p-4">{item?.price} $</p>
                               <Link href={`/Item/${item?.id}`} className="btn btn-accent ">View</Link>
                           </div>
                   </div>
                   <div></div>
               </div>
                    )})}
                    <div className="h-1 m-4 "></div>
        </div>
    )
}
