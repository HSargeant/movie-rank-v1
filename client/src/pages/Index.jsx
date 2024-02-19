import { useLayoutEffect } from "react";
import logo from "../logo.png"
import { API_BASE } from "../constants"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import Card from "@mui/material/Card"
import { CardContent, CardMedia, Grid } from '@mui/material';
import Google from "@mui/icons-material/Google"
import { getUser } from "../utility/getUser";

const footStyle = {
  marginTop: "25px",
  padding: "25px 0",
  width: "100%",
  textAlign: "center"
}

const linkStyle = {
  "&:hover": {
    borderBottom: "#333 solid 1px",
    fontSize: "1.07em"
  },
  marginRight: "1em",
  color: "#333 !important",
  borderBottom: "#333 dotted 1px",
  fontSize: "1.05em",

}

const handleLogin = (e) => {
  e.preventDefault()
  fetch(API_BASE + "/auth/google")
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
}

export default function Index() {
  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#eee"
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 1220, margin: '0 auto' }}>
      <AppBar position="static" sx={{ mb: 10, backgroundColor: "#333" }}>
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Home
          </Typography> */}
        </Toolbar>
      </AppBar>

      {/* Logo */}
      <Box
        component="img"
        sx={{
          // height: 233,
          // width: 350,
          // maxHeight: { xs: 233, md: 167 },
          width: { xs: 350, md: "auto" },
          marginBottom: 5
        }}
        alt="The house from the offer."
        src={logo}
      />
      {/* <img src={logo} alt="Movie Rank Logo" style={{marginBottom:30, maxWidth:600}} /> */}

      <Typography variant="h5" color="textPrimary" align="center">
        Help Rank your favorite movies and create a collection of your personal favorites

      </Typography>


      {/* Google Login Button */}
      <a href={API_BASE + "/auth/google"}>
        <Button
          variant="contained"
          color="error"
          startIcon={<Google />}
          style={{ width: '200px', margin: '16px 0' }}
        >
          Login with Google
        </Button>
      </a>
      <Divider style={{ width: '75%', margin: '16px 0' }} />

      {/* Copyright Statement */}
      <Typography variant="body2" color="textSecondary" align="center">
        &copy; 2024 HS Software Engineering
      </Typography>
    </div>
  );
}
