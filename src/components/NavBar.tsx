
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Search from "./SearchBar";


export const NavBar = () =>  {

    const {  data: Session } = useSession();
    const user = Session?.user

    return (
        <nav className="navbar bg-base-300 w-full z-20 top-0 sticky left-0 py-3 text-white">
          <div className="flex-1 gap-4 ">
              <Link href="/">Onlinestore</Link>
              <Search/>
          </div>
          <div className="flex-none gap-2">
            {user == null ? (
              <div>
                 <button onClick={() => void signIn()}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold  no-underline transition hover:bg-white/20"
              >Sign in</button>
           </div>
            ) : (
              <div className="flex gap-2">
                <div  className="flex items-center gap-4">
                <Link href="/create-post">Sell an item</Link>
                  <span>{user?.name}</span>
                </div>
                <div className="dropdown dropdown-end z-[1]">
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
                  <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 ">
                    <li>
                      <Link href={`/profile`} className="justify-between">
                          Profile
                      </Link>
                      <Link href="/cart"className="justify-between">
                        Cart
                      </Link>
                    </li>
                    <li onClick={() => void signOut()}><a>Logout</a></li>
                  </ul>
                  </div>
              </div>)}
          </div>
        </nav>
    )
  }