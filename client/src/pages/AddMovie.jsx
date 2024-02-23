import { Box, Grid, Card, CardContent, Typography, Button, Link, FormControlLabel, Checkbox, Container, TextField,ThemeProvider,createTheme } from '@mui/material';
import Menu from "../components/Header"
import styles from "./home.module.css"
import { useState } from 'react';

// Your form component (replace with actual form fields)
const MyForm = () => {
  // Implement your form logic here
  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar> */}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={null} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

// Sample data for the cards (replace with actual data)
const cardData = [
  { id: 1, title: 'Card 1', content: 'Some data for Card 1' },
  { id: 2, title: 'Card 2', content: 'Some data for Card 2' },
  // Add more cards as needed
];
const theme = createTheme({
  palette: {
      type: 'dark',
  },
})
const handleSubmit= async (e)=>{
  e.preventDefault()

  try {
    const form = e.target;
    const response = await fetch(form.getAttribute("action"), {
      method: form.method,
      body: new FormData(form),
      credentials: "include",
    });
    const data = await response.json();
  } catch (err) {
    console.log("Error:" + err);
  }
  // const response = await fetch(url,{})

}
const AddMovie = () => {
  const [name,setName] =useState("")
  const [year,setYear] = useState("")
  const [results,setResults] = useState([])
  const [choices,setChoices] = useState([])


  return (
    <div className={styles.container}>
      <Menu add="add" />
      <div className={styles["modal-body"]}>
        <span style={{
          color:"#f7f7ed",
          display: "flex",
          justifyContent: "center",
          margin: "20px 0 0 0"
          }}>**Tip: Including the release year is helpful when dealing with a movie that has sequels or has been
          remade**</span>
        <form action="/api/home/movieQuery" method="POST"
        style={{
          color:"#f7f7ed",
          display: "flex",
          justifyContent: "center",
          marginTop:15,
          alignItems:"baseline"
        }}
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        >
          {/* <input type="text" placeholder="Movie Name" name="name" id="name" /> */}
          {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}

          {/* <input type="number" placeholder="Release Year (optional)" name="year" id="year" /> */}
          <div class="form__group field">
  <input type="input" class="form__field" placeholder="Name" name="name" id='name' required style={{marginRight:20}} onChange={(e)=>setName(e.target.value)} value={name} />
  <label for="name" class="form__label" >Name</label>
</div>
          <div class="form__group field">
  <input type="input" class="form__field" placeholder="Year" name="year" id='year' onChange={(e)=>setYear(e.target.value)} value={year}/>
  <label for="year" class="form__label">Year (optional)</label>
</div>

          {/* <input type="input" class="form__field" placeholder="Year" name="year" id='year' required />
  <label for="year" class="form__label">Name</label> */}
          {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" InputLabelProps={{className: "textField__text"}} inputProps={{className:"inputColor"}} /> */}
          <Button sx={{height:35}} variant="contained" size="small" type='submit'>Submit</Button>

          {/* <input type="submit" id="submitMovie" value="Submit" className={styles.btn + " " + styles["btn-primary"]} /> */}
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
