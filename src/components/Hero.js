import { Typography, Grid, Button, Box } from "@mui/material";
import "../app/cardstyles.css";

const Hero = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={6} md={8} sx={{ mt: 20, ml: 10 }}>
        <Typography
          variant="h1"
          style={{ color: "#000000", zIndex: 1, position: "relative" }}
        >
          Explore the World Through Photography
        </Typography>
        <Button
          sx={{ mt: 5 }}
          style={{
            backgroundColor: "#4CAF50", 
            color: "white", 
            padding: "10px 20px", 
            borderRadius: "5px", 
            fontSize: "16px", 
            cursor: "pointer", 
            transition: "background-color 0.3s", 
          }}
        >
          Join Us
        </Button>
      </Grid>
      <Grid item style={{ marginTop: "60px", position: "relative", zIndex: 0 }}>
        <div className="card">
          <div className="wrapper">
            <img src="/photographer.png" className="cover-image" />
          </div>
          <img src="/photowalk.png" className="title" />
          <img src="/bird.png" className="character" />
        </div>
      </Grid>
    </Grid>
  );
};

export default Hero;
