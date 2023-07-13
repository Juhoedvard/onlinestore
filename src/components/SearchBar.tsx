/* eslint-disable @typescript-eslint/no-floating-promises */
"use client"

import { useRouter } from "next/router"
import { useState } from "react"



export function Search()  {

    const [searchQuery, setSearchQyery] = useState("")
    const router = useRouter()

    const handleSearch =  (event: React.FormEvent) => {
        console.log(searchQuery)
        event.preventDefault()
        searchQuery.toLowerCase()
        if(searchQuery == null){
            router.replace("/")

        }

        router.push(`/search/${searchQuery}`);
        setTimeout(() =>  {
            setSearchQyery("")
        }, 7000)

    }
    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form className="form-control align-self-center" onSubmit={handleSearch} >
              <input type="text" onChange={(e) => setSearchQyery(e.target.value)} value={searchQuery} placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </form>
    )
}