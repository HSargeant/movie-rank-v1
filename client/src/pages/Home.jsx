import { useLayoutEffect, useState, useMemo } from "react";
import { Link, useLoaderData, redirect } from "react-router-dom"
import { Container, Grid, CircularProgress } from '@mui/material';
import SearchBar from "../components/SearchBar"
import MyCard from "../components/CardSection"
import LogoImage from "../components/Logo"
import MyAppBar from "../components/Menu"
import { useQuery } from '@tanstack/react-query'
import styles from "./home.module.css"

export default function Home() {
  const { loaderData, user } = useLoaderData()
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

  if (isPending) return (
    <div className={styles.container}>
      <h1 className={styles.hide}>Movie Rank</h1>
      <MyAppBar />
      <LogoImage />
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
      <h1 className={styles.hide}>Movie Rank</h1>
      <MyAppBar />
      <LogoImage />
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