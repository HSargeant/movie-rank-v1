import { useLayoutEffect } from "react";
import logo from "../logo.png"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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

export default function Index() {
  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#eee"
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 1220, margin: '0 auto' }}>
      <AppBar position="static" sx={{ mb: 10, backgroundColor: "#333" }}>
        <Toolbar>
        </Toolbar>
      </AppBar>

      {/* Logo */}
      <Box
        component="img"
        sx={{
          width: { xs: 350, md: "auto" },
          marginBottom: 5
        }}
        alt="Movie Rank Logo."
        src={logo}
      />
      <Typography variant="h5" color="textPrimary" align="center">
        Help Rank your favorite movies and create a collection of your personal favorites
      </Typography>
      {/* Google Login Button */}
      <a href="/auth/google">
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
