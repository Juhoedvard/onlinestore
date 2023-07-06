/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { api } from "~/utils/api";
import { type Item } from "@prisma/client";
import  Image from "next/image";

const Items = () => {

  const {data: allItems} = api.item.getAll.useQuery();
  console.log(allItems);

  const {data: user} = api.user.getAll.useQuery();
  console.log(user)
  if(!user){
    return(
      <div>There are not market posts yet</div>
    )
  }

    return(
        <div className="flex mx-10 my-10 space-x-4 space-y-4">
          {allItems?.map((item : Item) => {
            return(
              <div key={item.id} className="card w-96 bg-base-100 shadow-xl ">
              <div className="card-body">
                  <h2 className="card-title">{item.product}</h2>
                  <p>{item.price}</p>
                  <div className="card-actions justify-end">
                    {item.image && (
                        <Image
                        src={`${item.image}`}
                        width={300}
                        height={300}
                        alt="image"/>
                    )}
                  <button className="btn btn-primary">Buy Now</button>
                  </div>
              </div>
          </div>
          )})}
        </div>
    )
}


export default function Home() {

  return (
    <>
      <main className="flex min-h-screen flex-col gap-10 bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <Items/>
      </main>
    </>
  );
}
