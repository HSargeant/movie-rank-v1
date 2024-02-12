import { useNavigate, useOutletContext, Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../logo.png"
import { API_BASE } from "../../constants"
import "./indexPage.css"
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

const loadM = () => {
    const link = window.document.createElement('link');
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
    link.rel = "stylesheet";
    window.document.getElementsByTagName('head')[0].appendChild(link);
}
// loadM()

const handleLogin = (e) => {
    e.preventDefault()
    fetch(API_BASE + "/auth/google")
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })

}
export default function Index() {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 1220, margin: '0 auto' }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit">
                Home
              </Typography>
            </Toolbar>
          </AppBar>
    
          {/* Logo */}
          <img src="your-logo.png" alt="Your Logo" style={{ width: '100px', margin: '16px 0' }} />
    
          {/* Divider */}
          <Divider style={{ width: '100%', margin: '16px 0' }} />
    
          {/* Google Login Button */}
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Google />}
            style={{ width: '200px', margin: '16px 0' }}
          >
            Login with Google
          </Button>
    
          {/* Copyright Statement */}
          <Typography variant="body2" color="textSecondary" align="center">
            &copy; 2024 Your Author Name
          </Typography>
        </div>
      );
}
