"use client";
import { Box, Grid, Typography } from "@mui/material";

const GallerySquare = () => {
  return (
    <Grid container spacing={1} sx={{ textAlign: "center", mt: 8, mb: 6 }}>
      <Grid item xs={12}>
        <Typography variant="h2" sx={{ color: "#333", fontWeight: "bold", mb: 2 }}>
          Gallery
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#666", fontStyle: "italic" }}>
          Where Every Picture Tells a Story
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ mt: { xs: 2, md: 20 } }}>
          <Typography variant="h2" sx={{ fontWeight: "bold" }}>
            Best Moments
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#666", fontStyle: "italic", mx: 1, mt: 2 }}>
            Explore some of the most captivating moments captured through our lenses. Each photo narrates a unique story, and we invite you to be part of these unforgettable experiences.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} sx={{ mt: { xs: 5, md: 10 } }}>
        <div className="gallery-square">
       
          <img src="/photographer.png" alt="bird" />
          <img src="/photographer.png" alt="bird" />
          <img src="/photographer.png" alt="bird" />
          <img src="/photographer.png" alt="bird" />
          <img src="/photographer.png" alt="bird" />
          <img src="/photographer.png" alt="bird" />
          <img src="/photographer.png" alt="bird" />
          <img src="/photographer.png" alt="bird" />
          <img src="/photographer.png" alt="bird" />
    
        </div>
      </Grid>
      <Grid item xs={12} md={6} sx={{ mt: { xs: 5, md: 5 } }}>
        <Box sx={{ ml: { xs: 0, md: 10 } }}>
          <div className="gallery-square">
          <img src="/photographer.png" alt="bird" />
          <img src="/photographer.png" alt="bird" />
          <img src="/photographer.png" alt="bird" />
          <img src="/photographer.png" alt="bird" />
          <img src="/photographer.png" alt="bird" />
          <img src="/photographer.png" alt="bird" />
          <img src="/photographer.png" alt="bird" />
          <img src="/photographer.png" alt="bird" />
          <img src="/photographer.png" alt="bird" />
          </div>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} sx={{ mt: { xs: 5, md: 10 } }}>
        <Box sx={{ mt: { xs: 5, md: 0 } }}>
          <Typography variant="h2" sx={{ fontWeight: "bold" }}>
            Best Moments
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#666", fontStyle: "italic", mx: 1, mt: 2 }}>
            Explore some of the most captivating moments captured through our lenses. Each photo narrates a unique story, and we invite you to be part of these unforgettable experiences.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default GallerySquare;







