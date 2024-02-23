import { useState } from 'react';
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
import { Link as RouterLink } from "react-router-dom"
import { Link } from '@mui/material';
import lightLogo from "../logo-light.png"

const drawerWidth = 240;

export default function MyAppBar(props) {
  1
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }} >
      <Typography variant="h6" sx={{ my: 2 }}>
        Movie Rank
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton to={"/profile"} element={RouterLink} sx={{ textAlign: 'center' }}>
            <ListItemText primary="Your Top Movies" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="Add Your Favorite Movies" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
        <ListItem element={RouterLink} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton to={"/logout"} element={RouterLink} sx={{ textAlign: 'center' }}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const NavLinks = () => {
    if (props.profile) {
      return (
        <Link component={RouterLink} to="/home">
          <Button sx={{ color: '#fff' }}>
            Home
          </Button>
        </Link>
      )
    }
    if (props.add) {
      return (
        <>
          <Link component={RouterLink} to="/home">
            <Button sx={{ color: '#fff' }}>
              Home
            </Button>
          </Link>
          <Link component={RouterLink} to="/profile">
            <Button sx={{ color: '#fff' }}>
              Your Movies
            </Button>
          </Link>
        </>
      )
    }
    return (
      <Link component={RouterLink} to="/profile">
        <Button sx={{ color: '#fff' }}>
          Your Movies
        </Button>
      </Link>

    )
  }

  return (
    <>
      <Box sx={{ display: 'flex', height: 70 }}>
        <AppBar component="nav" position='static' color="transparent" elevation={0}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon sx={{ color: "#eee" }} />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              {/* */}
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block', height: "auto" } }}>
              <NavLinks />
              <Link component={RouterLink} to={"/add"}>
                <Button sx={{ color: '#fff' }}>
                  Add Your Favorite Movies
                </Button>
              </Link>
              <Button sx={{ color: '#fff' }}>
                About
              </Button>
              <Link component={RouterLink} to={"/logout"}>
                <Button sx={{ color: '#fff' }}>
                  Logout
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
        </Box>
      </Box>
      <div style={{ textAlign: 'center' }}>
        <img src={lightLogo} alt="Logo" width={400} />
        <i styles={{ color: "black" }} className={["fa", "fa-thumb-up"].join(" ")} ></i>
      </div>
    </>
  );
}
