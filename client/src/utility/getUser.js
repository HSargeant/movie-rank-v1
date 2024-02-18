export async function getUser() {
    const res = await fetch("/api/user", { credentials: "include" })
    const user = await res.json()
    return user
}