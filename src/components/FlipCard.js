"use client"
import { Container, Grid, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FlipCard = ({ destinations }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container sx={{ justifyContent: 'center', textAlign: 'center' }}>
      <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h2" sx={{ color: "#333", fontWeight: "bold", mb: 2 }}>
          Destinations
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#666", fontStyle: "italic" }}>
          Where Every Picture Tells a Story
        </Typography>
      </Grid>
        <Grid item xs={12}>
          <Slider {...settings}>
            {destinations.map((destination) => (
              <div key={destination.id} className="flip-card-container">
                <div className="flip-card-inner">
                  <div
                    className="flip-card-front"
                    style={{ backgroundImage: `url(${destination.imageSrc})` }}
                  >
                  </div>
                  <div
                    className="flip-card-back"
                    style={{ backgroundImage: `url(${destination.location})` }}
                  >
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FlipCard;
