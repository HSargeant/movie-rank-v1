import { useEffect, useState } from "react";
import { Outlet,useLoaderData, Navigate } from "react-router-dom";
import {
  useQuery,
} from '@tanstack/react-query'

export default function Root() {
  const [user, setUser] = useState();
  const [messages, setMessages] = useState();
  useEffect(() => {
    fetch("/api/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  // const cachedUserData = React.useMemo(() => {
  //   // Fetch additional user data if needed
  //   // Example: fetchUserDetails(user.id);
  //   return user; // Assuming user data is already available
  // }, [user]);

  // const { isLoading, error, data, isFetching } = useQuery({
  //     queryKey: ['userData'],
  //     queryFn: ()=>getUser(),
  //     refetchOnWindowFocus: false,
  //   })
  // api call to get logged in user
  // useEffect(() => {
  //     fetch("/api/user", { credentials: "include" })
  //         .then((res) => res.json())
  //         .then((res) => {setUser(res.user)});
  // }, []);
  // console.log(user)

  return (
    // <Outlet  />
    <Outlet context={{ user, setUser, setMessages, messages }} />
  );
}