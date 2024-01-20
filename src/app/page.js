// import GallerySection from "../components/GallerySection";

import GallerySection from "@/components/GallerySection";
import Hero from "@/components/Hero";
import GallerySquare from "@/components/GallerySquare";
import FlipCard from "@/components/FlipCard";

const destinations = [
  {
    id: 1,
    name: "Kasba",
    imageSrc: "/photographer.png",
    location: "/bird.png",
  },
  {
    id: 1,
    name: "Mandai",
    imageSrc: "/photographer.png",
    location: "/bird.png",
  },
  { id: 1, name: "Camp", imageSrc: "/photographer.png", location: "/bird.png" },
  {
    id: 1,
    name: "JM Road",
    imageSrc: "/photographer.png",
    location: "/bird.png",
  },
  {
    id: 1,
    name: "Flower Market",
    imageSrc: "/photographer.png",
    location: "/bird.png",
  },
  { id: 1, name: "ARAI", imageSrc: "/photographer.png", location: "/bird.png" },
  {
    id: 1,
    name: "Swami Narayan",
    imageSrc: "/photographer.png",
    location: "/bird.png",
  },
  {
    id: 1,
    name: "FC Road",
    imageSrc: "/photographer.png",
    location: "/bird.png",
  },
  {
    id: 1,
    name: "Pune Metro",
    imageSrc: "/photographer.png",
    location: "/bird.png",
  },
  {
    id: 1,
    name: "ISKON Temple",
    imageSrc: "/photographer.png",
    location: "/bird.png",
  },
  {
    id: 1,
    name: "Aga Khan Palace",
    imageSrc: "/photographer.png",
    location: "/bird.png",
  },
  {
    id: 1,
    name: "Friendship Garden",
    imageSrc: "/photographer.png",
    location: "/bird.png",
  },
  {
    id: 1,
    name: "Ganpati Darshan",
    imageSrc: "/photographer.png",
    location: "/bird.png",
  },
  {
    id: 1,
    name: "Laxmi Road",
    imageSrc: "/photographer.png",
    location: "/bird.png",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <GallerySection />
      <FlipCard destinations={destinations} />
      <GallerySquare />
    </>
  );
}
