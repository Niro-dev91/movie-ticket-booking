import Navbar from "../components/Navbar";

import Carousel from "../components/Carousel";
import MovieBannerSlider from "../components/MovieBannerSlider";
import ComingSoon from '../components/ComingSoon';
import Footer from '../components/Footer';

const movies = [
  {
    title: "How to Train Your Dragon",
    tagline: "The legend is real. – May 23",
    imageUrl: "/assets/movie2.jpg",
    bookNow: "/book/How_to_Train_Your_Dragon"
  },
  {
    title: "Alien",
    tagline: "In space, no one can hear you. – May 16",
    imageUrl: "/assets/movie4.jpg",
    bookNow: "/book/Alien",
  },
  {
    title: "Mission Impossible",
    tagline: "The Final Reckoning.",
    imageUrl: "/assets/movie5.jpg",
    bookNow: "/book/Mission_Impossible",
  },
];


export default function Home() {
  return (
    <>
      <Navbar />
      <div> {/* Prevent banner hiding under navbar */}
        <MovieBannerSlider movies={movies} />
        <Carousel />
        <ComingSoon />
        <Footer />
      </div>
    </>
  );
}
