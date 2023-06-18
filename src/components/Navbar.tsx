import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import Image from "next/image";


export default function Navbar() {
    const { data: sessionData } = useSession();
    console.log(sessionData)
    return (
        <div className="navbar bg-base-100 flex">
        <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">Onlinestore</a>
            <div className="form-control align-self-center ">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div>
        </div>
        <div className="flex-none gap-2">
            <span>{sessionData?.user.name}</span>
            <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                {sessionData?.user.image &&
                <div className="w-10 rounded-full">
                    <Image
                    src={sessionData?.user.image || '/public/static/placeholderImg'}
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
                <li><a>Logout</a></li>
            </ul>
            </div>
        </div>
        </div>
    )
}
function AuthShowcase() {
    const { data: sessionData } = useSession();

    const { data: secretMessage } = api.example.getSecretMessage.useQuery(
      undefined, // no input
      { enabled: sessionData?.user !== undefined },
    );

    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl text-white">
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
          {secretMessage && <span> - {secretMessage}</span>}
        </p>
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    );
  }