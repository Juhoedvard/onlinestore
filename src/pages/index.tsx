
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
      <main className="flex min-h-screen flex-col gap-40 bg-gradient-to-b items-center justify-center bg-[#55656d] scroll-smooth text-white">
        <div className="h-0.5 ">
        </div>
        <div className="grid container grid-cols-2 md:grid-cols-2 gap-20 items-center-z-0 ">
          {allItems?.map((item : Item) => {
            return(
              <div key={item.id} className=" rounded-lg bg-base-100 shadow-xl justify-self-center p-4 translate-y-3 ">
                <div className="flex flex-col items-center justify-center">
                  <h2 className="card-title m-4 justify-center" >{item.product}</h2>
                   <figure className="h-1/2 m-4">
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