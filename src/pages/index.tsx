
import { api } from "~/utils/api";
import { type Item } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Loading } from "~/components/LoadingProfile";
import type { NextPage } from "next";
import noImage from "../../public/noImage.jpg"


const Home: NextPage = () => {

  const {data : allItems, isLoading} = api.item.getAll.useQuery();
  if (isLoading) return <Loading/>
  return (
    <>
      <main className="flex min-h-screen flex-col bg-gradient-to-b bg-[#55656d] scroll-smooth text-white">
        <div className="flex items-center p-8">
          <h2 className="font-semibold text-4xl md:text-5xl lg:text-7xl">
            OnlineStore
          </h2>
        </div>
        <div className="grid container gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 items-center-z-0 ">
          {allItems?.map((item : Item) => {
            return(
              <div key={item.id} className=" rounded-lg bg-base-100 shadow-xl justify-self-center p-4 translate-y-3 ">
                <div className="flex flex-col items-center justify-evenly">
                  <h2 className="card-title m-4 justify-center" >{item.product}</h2>
                   <figure className="h-80 m-4">
                    {item.image ?
                      <Image
                          loader={() => item.image || ''}
                          src={item.image || noImage}
                          width={300}
                          height={300}
                          alt=""
                      /> :
                      <Image
                          src={noImage}
                          width={300}
                          height={300}
                          alt=""/>}
                   </figure>
                   <div className="flex flex-col justify-center gap-2">
                      <p className="m-3 text-center">{item.price} $</p>
                      <Link href={`/Item/${item.id}`} className="btn btn-accent">View</Link>
                    </div>
                  </div>
              </div>
          )})}
        </div>
        <br></br>
      </main>

    </>
  );
}
export default Home