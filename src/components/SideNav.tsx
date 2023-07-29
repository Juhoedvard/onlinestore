/* eslint-disable @typescript-eslint/restrict-template-expressions */

import Link from "next/link"




export const SideNav = () => {



    return(
        <div className=" flex min-h-screen text-white bg-[#3a454b] gap-20 sticky">
                <nav className=" items-center bg-base-300 w-40">
                    <br></br>
                    <ul className="flex flex-col gap-6 ">
                        <li className="h-10  hover:bg-[#3a454b] rounded-lg w-full text-center py-2"><Link href={`/profile/`} >Profile</Link></li>
                        <li className="h-10  hover:bg-[#3a454b] rounded-lg w-full text-center py-2"><Link href={`/profile/delivery-info`} >Delivery Info</Link></li>
                        <li className="h-10  hover:bg-[#3a454b] rounded-lg w-full text-center py-2"><Link href={`/profile/history`}>History</Link></li>
                    </ul>
                </nav>
        </div>
    )
}

