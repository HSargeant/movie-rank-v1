import { Box, Grid, Card, CardContent, Typography, Button, Link, FormControlLabel, Checkbox, Container, TextField, ThemeProvider, createTheme } from '@mui/material';
import Menu from "../components/Header"
import styles from "./home.module.css"
import { useState } from 'react';
import { API_BASE } from "../constants"
import MovieTable from '../components/MovieTable';

const AddMovie = () => {
  const [name, setName] = useState("")
  const [year, setYear] = useState("")
  const [results, setResults] = useState([])
  const [choices, setChoices] = useState([])
  // console.log(name,year)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("sent")
    try {
      const form = e.currentTarget;
      const body = {
        "name":name,
        "year":year
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

  const handleSelection= async (selected,setSelected)=>{
    console.log(selected)
    try {
      const post = await fetch("/api/home/addMovie", {
        method: "POST",
        body: JSON.stringify(selected),
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResults([])
      const response = await post.json();
      setSelected([])
      console.log(response)
    } catch (err) {
      console.log("Error:" + err);
    }


  }

  return (
    <>
    <Box component={"header"} className={styles.container}>
      <Menu add="add" />
    </Box>
    <Grid container justifyContent={"center"} flexDirection={"column"} alignContent={"center"} margin={"0 auto"} maxWidth={1220}>
      <Grid item flex alignContent={{md: "row", sm: "column"}}>
        <span style={{
          color: "#f7f7ed",
          display: "flex",
          justifyContent: "center",
          margin: "20px 0 0 0"
        }}>**Tip: Including the release year is helpful when dealing with a movie that has sequels or has been
          remade**</span>
        <form
          action="/api/home/movieQuery"
          encType="multipart/form-data"
          method="POST"
          onSubmit={handleSubmit}
          style={{
            color: "#f7f7ed",
            display: "flex",
            justifyContent: "center",
            marginTop: 15,
            alignItems: "baseline"
          }}
        >
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Name"
              name="name"
              id='name'
              required
              style={{ marginRight: 20 }}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <label htmlFor="name" className="form__label" >Name</label>
          </div>
          <div className="form__group field">
            <input type="text" min="1900" max="2099" className="form__field" placeholder="Year" name="year" id='year' onChange={(e) => setYear(e.target.value)} value={year} />
            <label htmlFor="year" className="form__label">Year (optional)</label>
          </div>
          <Button sx={{ height: 35 }} variant="contained" size="small" type="submit">Submit</Button>
        </form>
      </Grid>
      <MovieTable data={results} handleSelection={handleSelection} style={{width: 800}} />
    </Grid>
    </>
  );
};

export default AddMovie;
