import { Link, useNavigate,useLoaderData, redirect} from "react-router-dom"

export async function loader() {
    const res1 = await fetch("/api/user", { credentials: "include" })
    const user = await res1.json()
    if (!user) {
        return redirect("/")
    }
    const res = await fetch("/api/home")
    const data = await res.json()
    console.log(data)
    return { loaderData: data, user: user }
}

export default function Profile() {
    const {loaderData,user} = useLoaderData()
    const navigate=useNavigate()
    return <>Profile <Link to="/">home</Link> </>
}