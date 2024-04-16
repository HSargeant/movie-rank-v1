import { useLoaderData } from "react-router-dom"
import { CircularProgress, Typography } from '@mui/material';
import SearchBar from "../components/SearchBar"
import MyCard from "../components/CardSection"
import Header from "../components/Header"
import { useQuery } from '@tanstack/react-query'
import styles from "./home.module.css"

export default function Home() {
  const { loaderData, user } = useLoaderData()
  const getMovies = async () => {
    const res = await fetch("/api/home")
    const data = await res.json()
    return data.movies
  }
  const { isPending, data: movies, refetch } = useQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
    refetchOnWindowFocus: false,
    initialData: loaderData,
    // staleTime: 1000,
  })

  if (isPending) return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.hide}>Movie Rank</h1>
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
  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.hide}>Movie Rank</h1>
      <SearchBar />
      <section className={styles.cards}>
        {
          movies.map((movie, i) => (
            <MyCard movie={movie} i={i} user={user} key={movie._id} refetch={refetch} />
          ))
        }
      </section>
      {/* <AddMovie/>  */}
      <footer id="footer" >
        <Typography variant="body1" style={{ color: "#eee" }} align="center">
          &copy; 2024 HS Software Engineering
        </Typography>
      </footer>
    </div>
  )
}