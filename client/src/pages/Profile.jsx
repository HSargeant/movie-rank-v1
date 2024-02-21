import { useLoaderData } from "react-router-dom"
import { Typography, CircularProgress } from '@mui/material';
import SearchBar from "../components/SearchBar"
import MyCard from "../components/CardSection"
import LogoImage from "../components/Logo"
import MyAppBar from "../components/Menu"
import { useQuery } from '@tanstack/react-query'
import styles from "./home.module.css"

export default function Profile() {
  const { loaderData, user } = useLoaderData()
  const getMovies = async () => {
    const res = await fetch("/api/profile")
    const data = await res.json()
    console.log(data)
    return data
  }
  const { isPending, error, data: movies, isFetching } = useQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
    refetchOnWindowFocus: false,
    initialData: loaderData

  })

  if (isFetching) {
    return (
      <div className={styles.container}>
        <h1 className={styles.hide}>Movie Rank</h1>
        <MyAppBar />
        <LogoImage />
        <section style={{ color: "#eee" }}>
          <h1>{user.displayName}'s Top Movies</h1>
        </section>
        <section>
          <div style={{
            display: "flex",
            justifyContent: "center",
            margin: "50px 0"
          }} >
            <CircularProgress />
          </div>
        </section>
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.hide}>Movie Rank</h1>
      <MyAppBar profile="profile" />
      <LogoImage />
      <section style={{ color: "#eee" }}>
        <h1>{user.displayName}'s Top Movies</h1>
      </section>
      <SearchBar />
      <section className={styles.cards}>
        {
          movies.map((movie, i) => (
            <MyCard movie={movie} i={i} backgroundColor={"#333"} user={user} />
          ))
        }
      </section>
      <footer id="footer" >
        <Typography variant="body1" style={{ color: "#eee" }} align="center">
          &copy; 2024 HS Software Engineering
        </Typography>
      </footer>
    </div>
  )
}