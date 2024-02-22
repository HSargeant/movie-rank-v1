import { Box, Grid, Card, CardContent, Typography, Button, Link,FormControlLabel,Checkbox,Container,TextField } from '@mui/material';
import Menu from "../components/Menu"
import styles from "./home.module.css"

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

const AddMovie = () => {
  return (
    <div className={styles.container}>

    <Menu add="add"/>
    </div>
    // <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    //   <div>
    //     {/* Centered form */}
    //     <MyForm />

    //     {/* Card grid */}
    //     <Grid container spacing={2}>
    //       {cardData.map((card) => (
    //         <Grid item key={card.id} xs={12} sm={6} md={4}>
    //           <Card>
    //             <CardContent>
    //               <Typography variant="h6">{card.title}</Typography>
    //               <Typography>{card.content}</Typography>
    //             </CardContent>
    //           </Card>
    //         </Grid>
    //       ))}
    //     </Grid>

    //     {/* Submit button */}
    //     <Button variant="contained" color="primary">
    //       Submit
    //     </Button>
    //   </div>
    // </Box>
  );
};

export default AddMovie;
