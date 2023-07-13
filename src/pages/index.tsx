/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { api } from "~/utils/api";
import { type Item } from "@prisma/client";
import Image from "next/image";
import Product from "../../public/shoes.png";
import Link from "next/link";

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
        <div className="h-1 ">
        </div>
        <div className="grid container grid-cols-2 md:grid-cols-3 gap-20 items-center justify-center -z-0 ">
          {allItems?.map((item : Item) => {
            return(
              <div key={item.id} className="w-80 h-70 rounded-lg bg-base-100 shadow-xl items-center justify-center flex flex-col">
                <Link href={`/Item/${item.id}`}>
                <h2 className="card-title m-4 justify-center" >{item.product}</h2>
                <figure className="h-1/2 m-4">
                  <Image
                      src={Product}
                      width={200}
                      height={200}
                      alt=""
                  />
                </figure>
                <p className="m-3 text-center">{item.price} $</p>
                </Link>

            </div>
          )})}
        </div>
        <footer className="footer p-10 text-neutral-content bg-base-300">
          <div>
            <span className="footer-title">Services</span>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </div>
          <div>
            <span className="footer-title">Company</span>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </div>
          <div>
            <span className="footer-title">Legal</span>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </div>
        </footer>
      </main>
    </>
  );
}
