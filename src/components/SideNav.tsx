/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useSession } from "next-auth/react"
import Link from "next/link"




export const SideNav = () => {

    const { data: session } = useSession()


    return(
        <div className=" flex min-h-screen text-white bg-[#3a454b] gap-20 sticky">
                <nav className=" items-center bg-base-300 w-40">
                    <br></br>
                    <div className="flex flex-col ">
                        <Link href={`/profile/`} className="h-10  hover:bg-[#3a454b] rounded-lg w-full text-center py-6">Profile</Link>
                        <Link href={`/profile/delivery-info`} className="h-10  hover:bg-[#3a454b] rounded-lg w-full text-center py-6">Delivery Info</Link>
                        <Link href={`/profile/history`} className="h-10  hover:bg-[#3a454b] rounded-lg w-full text-center py-6">History</Link>
                        <Link href={`/profile/${session?.user.id}/payment`} className="h-10  hover:bg-[#3a454b] rounded-lg w-full text-center py-6">Payment</Link>
                    </div>
                </nav>
        </div>
    )
}

