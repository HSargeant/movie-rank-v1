import { useEffect } from "react";
import { useNavigate, useOutletContext, redirect } from "react-router-dom";
import { getUser } from "../utility/getUser";

export async function loader() {
  const user = await getUser()
  if (!user) {
    return redirect("/")
  }
  const res = await fetch("/api/home")
  const data = await res.json()
  console.log(data)
  return { loaderData: data, user: user }
}

export default function Logout() {
  // const { setUser } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/logout", { method: "POST", credentials: "include" })
      .then(() => {
        // setUser(null);
        navigate("/");
      });
  }, []);

  return <main className="container">
    <div style={{
      marginTop: "15%",
      display: "flex",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center"
    }} >
      <p>Logged out...</p>
    </div>
  </main>
}