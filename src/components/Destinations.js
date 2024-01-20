
import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const destinations = [
  {id: 1, name: 'Kasba', imageSrc:'/photographer.png', location:'/bird.png'},
  {id: 1, name: 'Mandai', imageSrc:'/photographer.png', location:'/bird.png'},
  {id: 1, name: 'Camp', imageSrc:'/photographer.png', location:'/bird.png'},
  {id: 1, name: 'JM Road', imageSrc:'/photographer.png', location:'/bird.png'},
  {id: 1, name: 'Flower Market', imageSrc:'/photographer.png', location:'/bird.png'},
  {id: 1, name: 'ARAI', imageSrc:'/photographer.png', location:'/bird.png'},
  {id: 1, name: 'Swami Narayan', imageSrc:'/photographer.png', location:'/bird.png'},
  {id: 1, name: 'FC Road', imageSrc:'/photographer.png', location:'/bird.png'},
  {id: 1, name: 'Pune Metro', imageSrc:'/photographer.png', location:'/bird.png'},
  {id: 1, name: 'ISKON Temple', imageSrc:'/photographer.png', location:'/bird.png'},
  {id: 1, name: 'Aga Khan Palace', imageSrc:'/photographer.png', location:'/bird.png'},
  {id: 1, name: 'Friendship Garden', imageSrc:'/photographer.png', location:'/bird.png'},
  {id: 1, name: 'Ganpati Darshan', imageSrc:'/photographer.png', location:'/bird.png'},
  {id: 1, name: 'Laxmi Road', imageSrc:'/photographer.png', location:'/bird.png'}
];

const Destinations = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1, // Adjust as needed
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Container sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h2" sx={{ color: "#333", fontWeight: "bold", mb: 2 }}>
        Destinations
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "#666", fontStyle: "italic", mb: 5 }}>
        Where Every Picture Tells a Story
      </Typography>
      <Slider {...settings}>
        {destinations.map((destination) => (
          <Card key={destination.id} style={{ margin: '10px' }}>
            <CardActionArea>
              <Grid container spacing={2}>
                
                <Grid item md={6} xs={12}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={destination.imageSrc}
                    alt={destination.name}
                    style={{ position: 'relative' }}
                  />
                  
                </Grid>
                <Grid item md={6} xs={12}>
                  <iframe
                    title={`Map for ${destination.name}`}
                    src={destination.location}
                    width="100%"
                    height="400"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                  ></iframe>
                </Grid>
              </Grid>
              <CardContent sx={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', padding: '10px' }}>
                  <Typography variant="h5" component="div">
                    {destination.name}
                  </Typography>
                </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Slider>
    </Container>
  );
};

export default Destinations;
