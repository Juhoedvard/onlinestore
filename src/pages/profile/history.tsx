import type { Item } from "@prisma/client";
import type { NextPage } from "next";
import { SideNav } from "~/components/SideNav";
import { api } from "~/utils/api";
import Image from "next/image"
import Product from "../../../public/shoes.png";


const History:NextPage = () =>{


    const {data: items} = api.item.getUserItems.useQuery()
    console.log(items)

    return (
        <div className="flex gap-10 text-white bg-[#3a454b] scroll-smooth">
            <SideNav/>
            <div className="flex flex-col gap-10 w-2/3 justify-center items-center ">
                <h1 className="text-2xl py-5">Your items</h1>
                    {items?.map((item: Item) => {
                        console.log(item.creationDay)
                        return(
                            <div key={item.id}  className="flex flex-row w-full rounded-lg bg-base-100 shadow-xl justify-self-center p-4 translate-y-3 gap-10 justify-between px-10">
                               <div className="flex-1 flex-col gap-10 justify-between" >
                                    <h2 className="text-xl">{item.product}</h2>
                                    <p>{item.price} $</p>
                                    <p>{item.creationDay.getDate()}.{item.creationDay.getMonth()}.{item.creationDay.getFullYear()}</p>
                                </div>
                                <div className="flex-1 flex-col gap-5">
                                    <h2>Description: </h2>
                                    <span>{item.description}</span>
                                    </div>
                                <figure>
                                    <Image
                                        src={Product}
                                        width={200}
                                        height={200}
                                        alt=""/>
                                </figure>
                                <button>Edit</button>
                            </div> )
                    })
                }
                <br></br>
            </div>
        </div>
    )
}



export default History