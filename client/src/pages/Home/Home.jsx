import { useLayoutEffect } from "react";
import { Link, useLoaderData,redirect } from "react-router-dom"
import { Container, Grid, CircularProgress } from '@mui/material';
import SearchBar from "../../components/SearchBar"
import MyCard from "../../components/CardSection"
import LogoImage from "../../components/Logo"
import MyAppBar from "../../components/Menu"
import { useQuery } from '@tanstack/react-query'
import styles from "./home.module.css"
// import "./home.css"
import { getUser } from "../../utility/getUser";

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

export default function Home() {
  const {loaderData,user} = useLoaderData()
  const getMovies = async () => {
    const res = await fetch("/api/home")
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
  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#2a2a2a"

});

  // const { user } = useOutletContext()
  if (isPending) return (
    <>
    <Container style={{ maxWidth: 1220 }}>
      <MyAppBar />
      <LogoImage />
      {/* <SearchBar /> */}
      <Grid container spacing={2}>
      <main className={styles.container}>
		<div style={{
			marginTop: "15%",
			display:"flex",
			alignItems:"center",
			alignContent:"center",
			justifyContent:"center"
		}} >
			<CircularProgress/>
		</div>
	</main>

      </Grid>
    </Container>
    </>
  )
  return (
    <Container style={{ maxWidth: 1220 }}>
      <MyAppBar />
      <LogoImage />
      <SearchBar />
      <Grid container spacing={2}>
        {
          movies.map((movie, i) => (
            <Grid item xs={6} sm={4} md={3} lg={12 / 5} key={movie.name + Math.random()} alignItems={"center"} >
              <MyCard movie={movie} i={i} backgroundColor={"#333"} user={user} />
            </Grid>

          ))
        }
      </Grid>
    </Container>
  )
}