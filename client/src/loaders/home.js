import { redirect } from "react-router-dom"
import { getUser } from "../utility/getUser"

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