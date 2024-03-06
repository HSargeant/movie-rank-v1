import { redirect } from "react-router-dom"

export async function loader() {
  const res = await fetch("/api/home")
  const data = await res.json()
  if (data.user === false) {
    return redirect("/")
  }
  return { loaderData: data.movies, user: data.user }
}