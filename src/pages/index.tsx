import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import Image from "next/image";



const Items = () => {

  const {data: allItems} = api.item.getAll.useQuery();
  console.log(allItems);

  const {data: user} = api.user.getAll.useQuery();
  console.log(user)

    return(
        <div className="flex mx-10 my-10 space-x-4 space-y-4">
            <div className="card w-96 bg-base-100 shadow-xl ">
                <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl ">
                <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


const Navbar =() => {
  const { data : sessionData } = useSession();
  console.log(sessionData)
  const user = sessionData?.user
  console.log(user)
  return (
      <div className="navbar bg-base-100 flex">
        <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">Onlinestore</a>
            <div className="form-control align-self-center ">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div>
        </div>
        <div className="flex-none gap-2">
          {user == null ? (
            <div>
               <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={() => void signIn()}
         >Sign in</button>
         </div>
          ) : (
            <div className="flex gap-2">
              <div  className="flex items-center">
                <span>{user?.name}</span>
              </div>
              <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  {user?.image &&
                  <div className="w-10 rounded-full">
                      <Image
                      src={user?.image || '/public/static/placeholderImg'}
                      width={300}
                      height={300}
                      alt="avatar"
                      />
                  </div>}
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li>
                  <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                  </a>
                  </li>
                  <li><a>Settings</a></li>
                  <li onClick={() => void signOut()}><a>Logout</a></li>
                </ul>
                </div>
            </div>)}
        </div>
      </div>
  )
}
export default function Home() {

  return (
    <>
      <main className="flex min-h-screen flex-col gap-10 bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <Navbar/>
          <Items/>
      </main>
    </>
  );
}
