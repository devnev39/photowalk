  "use client";
  import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
  import Slider from "react-slick";
  import "slick-carousel/slick/slick.css"; 
  import "slick-carousel/slick/slick-theme.css";


  const destinations = [
    {id: 1, name: 'Kasba', imageSrc:'/photographer.png'},
    {id: 1, name: 'Mandai', imageSrc:'/photographer.png'},
    {id: 1, name: 'Camp', imageSrc:'/photographer.png'},
    {id: 1, name: 'JM Road', imageSrc:'/photographer.png'},
    {id: 1, name: 'Flower Market', imageSrc:'/photographer.png'},
    {id: 1, name: 'ARAI', imageSrc:'/photographer.png'},
    {id: 1, name: 'Swami Narayan', imageSrc:'/photographer.png'},
    {id: 1, name: 'FC Road', imageSrc:'/photographer.png'},
    {id: 1, name: 'Pune Metro', imageSrc:'/photographer.png'},
    {id: 1, name: 'ISKON Temple', imageSrc:'/photographer.png'},
    {id: 1, name: 'Aga Khan Palace', imageSrc:'/photographer.png'},
    {id: 1, name: 'Friendship Garden', imageSrc:'/photographer.png'},
    {id: 1, name: 'Ganpati Darshan', imageSrc:'/photographer.png'},
    {id: 1, name: 'Laxmi Road', imageSrc:'/photographer.png'}
  ]

  const Destinations = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 100,
      slidesToShow: 4, // Adjust as needed
      slidesToScroll: 1,
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
            <Card key={destination.id}>
              <CardActionArea>
                <CardMedia component="img" height="400" image={destination.imageSrc} alt={destination.name} />
                <CardContent>
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


