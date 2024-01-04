"use client";

import { AppBar, Container, Toolbar, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Container>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <div>
            <Typography variant="body2" color='inherit'>
              © {new Date().getFullYear()} Photowalk. All rights reserved.
            </Typography>
          </div>
          <div>
            <Link href="/privacy-policy" color="inherit" sx={{ mx: 1 }}>
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" color="inherit" sx={{ mx: 1 }}>
              Terms of Service
            </Link>
            <Link href="/contact-us" color="inherit" sx={{ mx: 1 }}>
              Contact Us
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default Footer;
