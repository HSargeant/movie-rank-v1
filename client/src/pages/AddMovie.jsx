import { Box, Grid, Card, CardContent, Typography, Button, Link, FormControlLabel, Checkbox, Container, TextField, ThemeProvider, createTheme } from '@mui/material';
import Header from "../components/Header"
import styles from "./home.module.css"
import { useState } from 'react';
import { API_BASE } from "../constants"
import MovieTable from '../components/MovieTable';
const res = [
  { "id": 1, "name": 22, "image": 444, "year": 2022 },
  { "id": 2, "name": 22, "image": 444, "year": 2022 },
  { "id": 3, "name": 22, "image": 444, "year": 2022 },
]
const AddMovie = () => {
  const [name, setName] = useState("")
  const [year, setYear] = useState("")
  const [results, setResults] = useState([])
  const [postSuccess, setPostSuccess] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("sent")
    try {
      const form = e.currentTarget;
      const body = {
        "name": name,
        "year": year
      }
      const response = await fetch(form.getAttribute("action"), {
        method: form.method,
        body: JSON.stringify(body),
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setResults(data)
      console.log(data)
    } catch (err) {
      console.log("Error:" + err);
    }
    // if (data.messages) setMessages(data.messages);
    // navigate(-1);  // const response = await fetch(url,{})

  }

  const handleSelection = async (selected, setSelected, setPage) => {
    try {
      const post = await fetch("/api/home/addMovie", {
        method: "POST",
        body: JSON.stringify(selected),
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setPage(0)
      setResults([])
      const response = await post.text();
      setPostSuccess(response)
      setSelected([])
      console.log(response)
    } catch (err) {
      console.log("Error:" + err);
    }
  }

  return (
    <div className={styles.container}>
      <Header add="add" />
      <Grid container  flexDirection={"column"} alignContent={"center"}  >
          <Box style={{
            component:"p",
            color: "#f7f7ed",
            display: "flex",
            justifyContent: "center",
            margin: "20px 0 0 0",
          }}>**Tip: Including the release year is helpful to narrow responses**
          </Box>
          <Box
            component={"form"}
            action="/api/home/movieQuery"
            encType="multipart/form-data"
            method="POST"
            onSubmit={handleSubmit}
            sx={{
              color: "#f7f7ed",
              display: "flex",
              justifyContent: "center",
              marginTop: 2,
              marginBottom: 2,
              alignItems: { xs: "center", sm: "baseline" },
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <div className="form__group field" style={{ marginRight: 10  }}>
              <input
                type="input"
                className="form__field"
                placeholder="Name"
                name="name"
                id='name'
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <label htmlFor="name" className="form__label" >Name</label>
            </div>
            <div className="form__group field">
              <input type="text" min="1900" max="2099" className="form__field" placeholder="Year" name="year" id='year' onChange={(e) => setYear(e.target.value)} value={year} />
              <label htmlFor="year" className="form__label">Year (optional)</label>
            </div>
            <Button sx={{ height: 35, marginTop: 2, marginLeft: 1 }} variant="contained" size="small" type="submit">Submit</Button>
          </Box>
        <MovieTable data={results} handleSelection={handleSelection} style={{ width: 800 }} />
        {postSuccess && <div style={{ color: "#eee" }}>Movie(s) Added</div>}
      </Grid>
    </div>
  );
};

export default AddMovie;
