import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa6";

import { setSongs, setCurrentSongIndex, togglePlayPause } from "../features/audioSlice";

const FavoriteSongs = () => {
  const currentSongIndex = useSelector((state) => state.audio.currentSongIndex);
  const isPlaying = useSelector((state) => state.audio.isPlaying);

  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [songId, setSongId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("Users"));
        if (!user) {
          toast.error("User not found. Please log in again.");
          return;
        }
        const response = await axios.get(
          `http://localhost:4001/user/getFavorites?userId=${user._id}`
        );
        setFavoriteSongs(response.data.favoriteSongs);
        dispatch(setSongs(response.data.favoriteSongs));
      } catch (err) {
        setError("Failed to fetch favorite songs.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteSongs();
  }, [dispatch]);

  const handleSongClick = (index, _id) => {
    setSongId(_id);
    dispatch(setCurrentSongIndex(index));
    if (isPlaying) dispatch(togglePlayPause(true));
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 p-5 text-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Your Favorite Songs</h2>
      </div>
      <div className="w-[750px] mx-auto">
        <ul className="bg-black overflow-y-scroll border rounded-lg">
          {favoriteSongs.length > 0 ? (
            favoriteSongs.map((song, index) => (
              <li
                key={song._id}
                className="bg-black flex shadow-md rounded-lg p-4 hover:bg-gray-700 transition duration-300 cursor-pointer"
                onClick={() => handleSongClick(index, song._id)}
              >
                <p
                  className={`flex-1 text-lg font-semibold mb-2 ${
                    songId === song._id ? "text-gray-500" : "text-white"
                  }`}
                >
                  {index + 1}. {song.name}
                </p>
                <FaRegHeart />

                <p className="flex-1 text-right text-white">{song.artist}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-400 text-center p-4">You have no favorite songs yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FavoriteSongs;