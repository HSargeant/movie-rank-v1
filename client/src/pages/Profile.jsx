import { Link, useLoaderData } from "react-router-dom"
import { Container, Grid } from '@mui/material';
import SearchBar from "../components/SearchBar"
import MyCard from "../components/CardSection"
import LogoImage from "../components/Logo"
import MyAppBar from "../components/Menu"
import { useQuery } from '@tanstack/react-query'
import { useOutletContext } from "react-router-dom"
import { getUser } from "../utility/getUser";
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

  if (isPending) return <>....LOADING</>
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
    </div>
  )
}