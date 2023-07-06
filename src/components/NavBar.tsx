import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export function NavBar()  {
    const { data : sessionData } = useSession();
    console.log(sessionData)
    const user = sessionData?.user
    console.log(user)
    return (
        <div className="navbar bg-base-100 flex sticky">
          <div className="flex-1">
              <Link href="/">Onlinestore</Link>
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
                <div  className="flex items-center gap-4">
                <Link href="/create-post">Sell an item</Link>
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