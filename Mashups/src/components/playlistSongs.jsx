import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSongs, setCurrentSongIndex, togglePlayPause } from "../features/audioSlice";
import { apiconnecter } from "../services/apiconnecter";

const PlaylistSongs = ({ playlistName }) => {
  const currentSongIndex = useSelector((state) => state.audio.currentSongIndex);
  const isPlaying = useSelector((state) => state.audio.isPlaying);

  const [playlist, setPlaylist] = useState(null);
  const [playlistsongs, setPlaylistsongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [songid, setSongid] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPlaylistAndSongs = async () => {
      try {
        const response = await apiconnecter("get", `/${playlistName}`);
        const { playlist: playlistData, songs: songsData } = response.data;

        setPlaylist(playlistData);
        setPlaylistsongs(songsData);
        dispatch(setSongs(songsData));

        setLoading(false);
      } catch (error) {
        setError("Error fetching playlist and songs.");
        setLoading(false);
        console.error("Error fetching playlist and songs:", error);
      }
    };

    if (playlistName) {
      fetchPlaylistAndSongs();
    }
  }, [playlistName, dispatch]);

  const handleSongClick = (index, _id) => {
    setSongid(_id);
    dispatch(setCurrentSongIndex(index));
    if (isPlaying) dispatch(togglePlayPause(true));
  };

  if (loading) {
    return <div className="text-center mt-8 ">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 ">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white px-4">
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-white py-2 px-4 rounded"
      >
        <IoMdArrowRoundBack />
      </button>

      <div className="max-w-5xl mx-auto">
        {/* Playlist Info */}
        <div className="text-center mb-8">
          <img
            src={playlist.image}
            alt={playlist.name}
            className="w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 mx-auto shadow-lg mb-4 object-cover rounded-full"
          />
          <h2 className="text-2xl md:text-3xl font-bold">{playlist.name}</h2>
        </div>

        {/* Playlist Songs */}
        <ul className="bg-black overflow-y-scroll border border-gray-700 max-h-[70vh] rounded-lg">
          {playlistsongs.map((song, index) => (
            <li
              key={song._id}
              className={`flex items-center justify-between p-4 hover:bg-gray-700 transition duration-300 cursor-pointer ${
                songid === song._id ? "bg-gray-800" : "bg-black"
              }`}
              onClick={() => handleSongClick(index, song._id)}
            >
              <p
                className={`flex-1 text-sm md:text-lg font-semibold mb-2 ${
                  songid === song._id ? "text-gray-500" : "text-white"
                }`}
              >
                {index + 1}. {song.name}
              </p>
              <p className="flex-1 text-right text-sm md:text-lg text-white">
                {song.artist}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlaylistSongs;
