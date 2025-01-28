import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import axios from "axios";
// Import Slick Carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Styled components
const SliderContainer = styled.div`
  padding: 20px;
  background: #121212;
`;

const Slide = styled.div`
    display: flex;
  flex-direction: column;  /* Arrange items vertically */
  align-items: center; 
  
`;

const SongCard = styled.div`
  width: 30%;
  background-color: #1a1a1a;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
  text-align: center;
  color: #fff;

  img {
    max-width: 100%;
    border-radius: 10px;
    height: 150px;
    object-fit: cover;
  }

  h3 {
    margin-top: 10px;
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 0.9rem;
    color: #b3b3b3;
  }
`;

const NewReleasesSlider = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch songs from API
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/songs/songs");
        console.log(response.data);
        if (response.data && response.data.songs) {
          setSongs(response.data.songs);
          setLoading(false);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // One slide per scroll
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Render loading state
  if (loading) {
    return (
      <SliderContainer>
        <h2 style={{ color: "#fff" }}>Loading New Releases...</h2>
      </SliderContainer>
    );
  }

  // Render error state
  if (error) {
    return (
      <SliderContainer>
        <h2 style={{ color: "red" }}>Failed to load songs. Please try again later.</h2>
      </SliderContainer>
    );
  }

  return (
    <SliderContainer>
      <h2 style={{ color: "#fff", marginBottom: "20px" }}>New Releases</h2>
      <Slider {...settings}>
        {/* Grouping songs in rows */}
        {songs.map((song, index) => {
          if (index % 6 === 0) {
            return (
              <Slide key={song._id}>
                {songs.slice(index, index + 6).map((song) => (
                  <SongCard key={song._id}>
                    <img src={song.image} alt={song.name || "Song Cover"} />
                    <h3>{song.name}</h3>
                    <p>{song.artist}</p>
                  </SongCard>
                ))}
              </Slide>
            );
          }
          return null;
        })}
      </Slider>
    </SliderContainer>
  );
};

export default NewReleasesSlider;
