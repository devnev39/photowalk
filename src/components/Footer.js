"use client";
import Link from "next/link";
import { Box, Container, Grid, Typography, Button, Input } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          padding: "120px 0px 270px",
          position: "relative",
          overflowX: "hidden",
        }}
      >
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Box sx={{ ...footerWidgetStyles, animationDelay: "0.2s" }}>
                <Typography variant="h3" sx={footerTitleStyles}>
                  Get in Touch
                </Typography>
                <Typography variant="body1" sx={footerTextStyles}>
                  Don’t miss any updates of our new Photowalks!
                </Typography>
                <form style={subscribeFormStyles}>
                  <Input
                    type="text"
                    name="EMAIL"
                    placeholder="Email"
                    sx={{ marginRight: "10px", borderRadius: "5px" }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: "5px" }}
                  >
                    Subscribe
                  </Button>
                </form>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box sx={{ ...footerWidgetStyles, animationDelay: "0.8s" }}>
                <Typography variant="h3" sx={footerTitleStyles}>
                  Our Socials
                </Typography>
                <Box sx={socialIconStyles}>
                  <Link href="#">
                    <InstagramIcon sx={iconLinkStyles} />
                  </Link>
                  <Link href="#">
                    <FacebookIcon sx={iconLinkStyles} />
                  </Link>
                  <Link href="#">
                    <YouTubeIcon sx={iconLinkStyles} />
                  </Link>
                  <Link href="#">
                    <WhatsAppIcon sx={iconLinkStyles} />
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Box sx={footerBgStyles}>
          <Box sx={footerBgOneStyles}></Box>
          <Box sx={footerBgTwoStyles}></Box>
        </Box>
      </Box>

      <Box sx={footerBottomStyles}>
        <Container>
          <Grid container alignItems="center">
            <Grid item xs={12} md={6} sx={{ marginBottom: "5px" }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 400, color: "#1d1e1f" }}
              >
                © Photowalk
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: "right" }}></Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;

const footerWidgetStyles = {
  marginBottom: "30px",
};

const footerTitleStyles = {
  fontWeight: 600,
  color: "#263b5e",
  marginBottom: "30px",
};

const footerTextStyles = {
  fontSize: "16px",
  fontWeight: 300,
  lineHeight: "28px",
  color: "#6a7695",
  marginBottom: "20px",
};

const subscribeFormStyles = {
  display: "flex",
  alignItems: "center",
};

const footerBgStyles = {
  position: "absolute",
  bottom: 0,
  background:
    'url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigB8iI5tb8WSVBuVUGc9UjjB8O0708X7Fdic_4O1LT4CmLHoiwhanLXiRhe82yw0R7LgACQ2IhZaTY0hhmGi0gYp_Ynb49CVzfmXtYHUVKgXXpWvJ_oYT8cB4vzsnJLe3iCwuzj-w6PeYq_JaHmy_CoGoa6nw0FBo-2xLdOPvsLTh_fmYH2xhkaZ-OGQ/s16000/footer_bg.png") no-repeat scroll center 0',
  width: "100%",
  height: "266px",
};

const footerBgOneStyles = {
  background:
    'url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEia0PYPxwT5ifToyP3SNZeQWfJEWrUENYA5IXM6sN5vLwAKvaJS1pQVu8mOFFUa_ET4JuHNTFAxKURFerJYHDUWXLXl1vDofYXuij45JZelYOjEFoCOn7E6Vxu0fwV7ACPzArcno1rYuVxGB7JY6G7__e4_KZW4lTYIaHSLVaVLzklZBLZnQw047oq5-Q/s16000/volks.gif") no-repeat center center',
  width: "330px",
  height: "105px",
  backgroundSize: "100%",
  position: "absolute",
  bottom: 0,
  left: "30%",
  animation: "myfirst 22s linear infinite",
};

const footerBgTwoStyles = {
  background:
    'url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhyLGwEUVwPK6Vi8xXMymsc-ZXVwLWyXhogZxbcXQYSY55REw_0D4VTQnsVzCrL7nsyjd0P7RVOI5NKJbQ75koZIalD8mqbMquP20fL3DxsWngKkOLOzoOf9sMuxlbyfkIBTsDw5WFUj-YJiI50yzgVjF8cZPHhEjkOP_PRTQXDHEq8AyWpBiJdN9SfQA/s16000/cyclist.gif") no-repeat center center',
  width: "88px",
  height: "100px",
  backgroundSize: "100%",
  bottom: 0,
  left: "38%",
  position: "absolute",
  animation: "myfirst 30s linear infinite",
};

const footerBottomStyles = {
  fontSize: "14px",
  fontWeight: 300,
  lineHeight: "20px",
  color: "#7f88a6",
  padding: "27px 0px",
};

const socialIconStyles = {
  display: "flex",
  marginTop: "15px",
};

const iconLinkStyles = {
  marginRight: "10px",
  color: "black",
  fontSize: 30,
  textDecoration: "none",
  "&:hover": {
    color: "#5e2ced",
  },
};
