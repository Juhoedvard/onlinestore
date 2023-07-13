"use client"

import { useRouter } from "next/router"
import { useState } from "react"



export function Search()  {

    const [searchQuery, setSearchQyery] = useState("")
    const router = useRouter()

    const handleSearch =  (event: React.FormEvent) => {
        event.preventDefault()
        searchQuery.toLowerCase()

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
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