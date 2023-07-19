/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { NextPage } from "next"
import { useSession } from "next-auth/react"
import { SideNav } from "~/components/SideNav"
import { api } from "~/utils/api"







const Profile:NextPage = () => {

    const { data: session } = useSession()
    const {data: user} = api.user.getUser.useQuery()
    if(!session) return null
    return(
            <div className="flex gap-10 text-white bg-[#3a454b]">
                <SideNav/>
                <div className=" flex-1  my-6 mr-8">
                    <div className="flex flex-col gap-10">
                        <h2 className="text-3xl">Account info</h2>
                        <div className="flex border-b p-2 ">
                            <div className="flex flex-col gap-5">
                                <label>Name: </label>
                                <p>{user?.name}</p>
                            </div>
                        </div>
                        <div className="flex border-b p-2 ">
                            <div className="flex flex-col gap-5">
                                <label>Email: </label>
                                <p>{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}


export default Profile