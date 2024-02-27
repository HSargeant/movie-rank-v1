import { redirect } from "react-router-dom"
import { getUser } from "../utility/getUser"

export async function loader() {
  const user = await getUser()
  if (user) return redirect("/home")
  return null
}