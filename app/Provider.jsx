/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndex"
import { UserDetailContext } from "@/context/UserContext"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { useEffect, useState } from "react"

const Provider = ({children}) => {

    const { user } = useUser()
    const [userData, setUserData] = useState();
    const [selectedChapterIndex, setSelectedChapterIndex] = useState(0)

    const createUser = async() => {
        const res = await axios.post('/api/user', {
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress
        })
        setUserData(res.data.user);
    }

    useEffect(() => {
        user && createUser()
    }, [user])

  return (
    <UserDetailContext.Provider value={{userData, setUserData}}>
        <SelectedChapterIndexContext.Provider value={{selectedChapterIndex, setSelectedChapterIndex}}>
            {children}
        </SelectedChapterIndexContext.Provider>
    </UserDetailContext.Provider>
  )
}

export default Provider