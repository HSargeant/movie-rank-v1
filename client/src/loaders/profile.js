import { redirect } from "react-router-dom"
import { getUser } from "../utility/getUser"

export async function loader() {
  const res = await fetch("/api/profile")
  const data = await res.json()
  if (data.user === false) {
    return redirect("/")
  }
  return { loaderData: data.movies, user: data.user }
}