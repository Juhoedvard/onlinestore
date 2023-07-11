/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { api } from "~/utils/api";
import { type Item } from "@prisma/client";
import Image from "next/image";
import Product from "../../public/shoes.png";

export default function Home() {
  const {data: allItems} = api.item.getAll.useQuery();
  console.log(allItems);

  const {data: user} = api.user.getAll.useQuery();
  console.log(user)
  if(!user){
    return(
      <div>There are not market posts yet</div>
    )
  }
  return (
    <>
      <main className="flex min-h-screen flex-col gap-40 bg-gradient-to-b items-center justify-center bg-[#024b6d]">
        <div className="h-1/4 flex">
          <h2>Items</h2>
        </div>
        <div className="grid container grid-cols-2 md:grid-cols-3 gap-20 items-center justify-center -z-0 ">
          {allItems?.map((item : Item) => {
            return(
              <div key={item.id}className="card card-side w-80 h-60 bg-base-100 shadow-xl items-center justify-center">
                <div>
                <h2 className="card-title m-4">{item.product}</h2>
                <figure className="h-1/2 m-4">
                  <Image
                      src={Product}
                      width={200}
                      height={200}
                      alt=""
                  />
                  </figure>
                </div>
                <div className="card-body">
                <p>{item.description}</p>
                <b>{item.price}</b>
                  <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy</button>
                  </div>
              </div>
            </div>
          )})}
        </div>
      </main>
    </>
  );
}
