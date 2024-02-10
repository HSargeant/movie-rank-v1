import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
    useQuery,
  } from '@tanstack/react-query'
  

export default function Root() {
    const [user, setUser] = useState();
    const [messages, setMessages] = useState();
    const getUser= async ()=>{
        const response = await fetch("/api/user", { credentials: "include" })
        const data = await response.json()
        setUser(data.user)
        return data.user
    }


    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ['userData'],
        queryFn: ()=>getUser(),
        refetchOnWindowFocus: false,
      })
    // api call to get logged in user
    // useEffect(() => {
    //     fetch("/api/user", { credentials: "include" })
    //         .then((res) => res.json())
    //         .then((res) => {setUser(res.user)});
    // }, []);
    return (
            <Outlet context={{ user, setUser, setMessages, messages }} />
    );
}