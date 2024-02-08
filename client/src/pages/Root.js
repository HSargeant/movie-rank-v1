import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
export default function Root() {
    const [user, setUser] = useState();
    const [messages, setMessages] = useState();
    // api call to get logged in user
    useEffect(() => {
        fetch("/api/user", { credentials: "include" })
            .then((res) => res.json())
            .then((res) => {
                console.log(res.user)
                setUser(res.user)});
    }, []);
    return (
            <Outlet context={{ user, setUser, setMessages, messages }} />
    );
}