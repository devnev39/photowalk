"use client";
import { Box, Grid, Paper, Typography } from "@mui/material";
import "../app/gallerystyles.css";


const GallerySection = () => {


  return (
    <Grid container spacing={1} sx={{ textAlign: 'center', mt: 8, mb: 5 }}>
      <Grid item xs={12}>
        <Typography variant="h2" sx={{ color: "#333", fontWeight: "bold", mb: 2 }}>
          Gallery
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#666", fontStyle: "italic" }}>
          Where Every Picture Tells a Story
        </Typography>
      </Grid>

      <Grid item lg className="container" sx={{mx:10, mt:5}}>
        <img className="gallery-image" src="/download.jpg" alt="Image 1" />
        <img className="gallery-image" src="/download.jpg" alt="Image 2" />
        <img className="gallery-image" src="/download.jpg" alt="Image 3" />
        <img className="gallery-image" src="/download.jpg" alt="Image 3" />
        <img className="gallery-image" src="/download.jpg" alt="Image 3" />
        <img className="gallery-image" src="/download.jpg" alt="Image 3" />
        <img className="gallery-image" src="/download.jpg" alt="Image 3" />
        <img className="gallery-image" src="/download.jpg" alt="Image 3" />
        <img className="gallery-image" src="/download.jpg" alt="Image 3" />
        <img className="gallery-image" src="/download.jpg" alt="Image 3" />
        <img className="gallery-image" src="/download.jpg" alt="Image 3" />
        <img className="gallery-image" src="/download.jpg" alt="Image 3" />
        <img className="gallery-image" src="/download.jpg" alt="Image 3" />
      </Grid>
    </Grid>
  );
};

export default GallerySection;
