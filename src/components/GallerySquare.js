"use client";
import { Box, Container, Grid, Typography } from "@mui/material";

const GallerySquare = () => {
  return (
    <Container sx={{ mt: 8, textAlign: "center" }}>
    <Grid container spacing={3} sx={{ textAlign: "center" }}>
      <Grid item xs={12}>
        <Typography variant="h2" sx={{ color: "#333", fontWeight: "bold", mb: 2 }}>
          Gallery
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#666", fontStyle: "italic" }}>
          Where Every Picture Tells a Story
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ mt: { xs: 2 }}}>
          <Typography variant="h2" sx={{ fontWeight: "bold"}}>
            Best Moments
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#666", fontStyle: "italic", mx: 1, mt: 2, textAlign: 'center'}}>
            Explore some of the most captivating moments captured through our lenses. Each photo narrates a unique story, and we invite you to be part of these unforgettable experiences.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} sx={{ mt: { xs: 5 } }}>
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
      <Grid item xs={12} md={6} sx={{ mt: { xs: 5  } }}>
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
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ mt: { xs: 5 } }}>
          <Typography variant="h2" sx={{ fontWeight: "bold" }}>
            Best Moments
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#666", fontStyle: "italic", mx: 1, mt: 2 }}>
            Explore some of the most captivating moments captured through our lenses. Each photo narrates a unique story, and we invite you to be part of these unforgettable experiences.
          </Typography>
        </Box>
      </Grid>
    </Grid>
    </Container>
  );
};

export default GallerySquare;







