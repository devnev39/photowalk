"use client";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  List,
  ListItem,
} from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { UserAuth } from "@/config/AuthContext";
import { useAppError } from "@/context/ErrorContext";

const navItems = [
  {
    text: "Gallery",
    link: "/gallery",
  },
  {
    text: "Plans",
    link: "/plans",
  },
  {
    text: "Destination",
    link: "/destination",
  },
  {
    text: "About",
    link: "/about",
  },
];

const navStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  backdropFilter: "blur(5px)",
};

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, googleSignIn, logout } = UserAuth();
  const { setOpen, setMessage, setSeverity } = useAppError();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleAuth = async () => {
    try {
      if (user) {
        await logout();
        location.reload();
      } else {
        await googleSignIn();
      }
    } catch (error) {
      setMessage(error.message);
      setSeverity("error");
      setOpen(true);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        PHOTOWALK
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }} onClick={handleAuth}>
            <ListItemText primary={user ? "Logout" : "Login"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    typeof window !== "undefined" ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        position="fixed" // Set position to fixed
        color="transparent"
        elevation={0}
        style={{ ...navStyle, padding: 0 }} // Remove padding
      >
        <Toolbar>
          <IconButton>
            <TravelExploreIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            PHOTOWALK
          </Typography>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: {
                xs: "block",
                sm: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item.text}>{item.text}</Button>
            ))}
            <Button onClick={handleAuth}>{user ? "Logout" : "Login"}</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box" },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
