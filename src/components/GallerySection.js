"use client";

import { useState } from "react";
import { Container, Grid, Typography } from "@mui/material";

const GallerySection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleImageHover = (index) => {
    setHoveredIndex(index);
  };

  const handleImageLeave = () => {
    setHoveredIndex(null);
  };

  const galleryImages = [
    "/download.jpg",
    "/download.jpg",
    "/download.jpg",
    "/download.jpg",
    "/download.jpg",
    "/download.jpg",
    "/download.jpg",
    "/download.jpg",
    "/download.jpg",
    "/download.jpg",
    "/download.jpg",
    "/download.jpg",
    "/download.jpg",
  ];

  return (
    <Container sx={{ mt: 8, textAlign: "center" }}>
      <Grid container spacing={1} sx={{ textAlign: "center", mt: 8, mb: 5 }}>
        <Grid item xs={12}>
          <Typography
            variant="h2"
            sx={{ color: "#333", fontWeight: "bold", mb: 2 }}
          >
            Gallery
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#666", fontStyle: "italic" }}
          >
            Where Every Picture Tells a Story
          </Typography>
        </Grid>

        <Grid
          item
          lg
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            mx: 10,
            mt: 5,
            width: "80vw",
            height: "50vmin",
            gap: "1vmin",
          }}
        >
          {galleryImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              style={{
                height: "100%",
                filter: `grayscale(${hoveredIndex === index ? 0 : 1}) brightness(${
                  hoveredIndex === index ? 1.15 : 0.75
                })`,
                objectFit: "cover",
                overflow: "hidden",
                flex: hoveredIndex === index ? 6 : 1,
                transition: "flex 0.5s, filter 0.5s",
              }}
              onMouseEnter={() => handleImageHover(index)}
              onMouseLeave={handleImageLeave}
            />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default GallerySection;
