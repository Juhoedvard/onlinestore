/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { api } from "~/utils/api";
import { type Item } from "@prisma/client";
import Image from "next/image";
import Product from "../../public/shoes.png";
import Link from "next/link";
import { Loading } from "~/components/Loading";


export default function Home() {

  const {data : allItems, isLoading} = api.item.getAll.useQuery();
  if(isLoading) return <Loading/>

  return (
    <>
      <main className="flex min-h-screen flex-col gap-40 bg-gradient-to-b items-center justify-center ">
        <div className="h-0.5 ">
        </div>
        <div className="grid container grid-cols-2 md:grid-cols-2 gap-20 items-center-z-0 ">
          {allItems?.map((item : Item) => {
            return(
              <div key={item.id} className=" rounded-lg bg-base-100 shadow-xl justify-self-center p-4 ">
                <div className="flex flex-col items-center justify-center">
                  <Link href={`/Item/${item.id}`}>
                  <h2 className="card-title m-4 justify-center" >{item.product}</h2>
                  <figure className="h-1/2 m-4">
                    <Image
                        src={Product}
                        width={300}
                        height={300}
                        alt=""
                    />
                  </figure>
                  <div className="flex flex-col justify-center gap-2">
                    <p className="m-3 text-center">{item.price} $</p>
                    <Link href={`/Item/${item.id}`}className="btn btn-accent">View</Link>
                    </div>
                  </Link>
                </div>
            </div>
          )})}
        </div>
        <div className="h-1 ">

        </div>
      </main>
    </>
  );
}
