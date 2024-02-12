import { Link } from "react-router-dom"
import { Container, Grid } from '@mui/material';
import SearchBar from "../components/SearchBar"
import MyCard from "../components/CardSection"
import LogoImage from "../components/Logo"
import MyAppBar from "../components/Menu"
import { useQuery } from '@tanstack/react-query'
import { useOutletContext } from "react-router-dom"


export default function Profile() {

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

  })

  const { user } = useOutletContext()
  if (isPending) return <>....LOADING</>
  return (
    <Container style={{ maxWidth: 1220 }}>
      <MyAppBar />
      <LogoImage />
      <SearchBar />
      <Grid container spacing={2}>

        {
          movies.map(movie => (
            <Grid item xs={12} sm={6} md={4} lg={12 / 5} key={movie.name + Math.random()} >
              <MyCard {...movie} backgroundColor={"#333"} />
            </Grid>

          ))
        }
      </Grid>


    </Container>
  )
}