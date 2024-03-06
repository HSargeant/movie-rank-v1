export async function getUser() {
  try {
    const res = await fetch("/api/user", { credentials: "include" })
    const user = await res.json()
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}