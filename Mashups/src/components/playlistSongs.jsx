import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setSongs, setCurrentSongIndex ,togglePlayPause} from "../features/audioSlice";

const PlaylistSongs = ({ playlistName }) => {
  
  const currentSongIndex = useSelector((state) => state.audio.currentSongIndex);
  const isPlaying = useSelector((state) => state.audio.isPlaying);

  const [playlist, setPlaylist] = useState(null);
  const [playlistsongs, setPlaylistsongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [songid,setSongid] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPlaylistAndSongs = async () => {
      try {
        const response = await axios.get(
          `/api/${playlistName}`
        );
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

  const handleSongClick = (index,_id) => {
    console.log(_id);
    setSongid(_id);
    setCurrentSongIndex(index);
    console.log("the index from play",index);
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
    <div className="  min-h-screen  text-white">
     
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-white py-2 px-4 rounded"
      >
        <IoMdArrowRoundBack />
      </button>

      <div className="w-[750px] absolute top- left-[230px]">
        <div className="text-center mb-8">
          <img
            src={playlist.image}
            alt={playlist.name}
            className="size-80 mx-auto shadow-lg mb-4"
          />
          <h2 className="text-3xl font-bold ">{playlist.name}</h2>
        </div>
        <ul className="bg-black overflow-y-scroll border">
          {playlistsongs.map((song, index) => (
            <li
              key={song._id}
              className="bg-black flex shadow-md rounded-lg p-4 hover:bg-gray-700 transition duration-300 cursor-pointer"
              onClick={() => handleSongClick(index,song._id)}
            >
              <p
                className={`flex-1 text-lg font-semibold mb-2 ${
                  songid == song._id ? " text-gray-500" : " text-white"
                }`}
              >
                {index + 1}. {song.name}
              </p>
              <p className="flex-1 text-right text-white">{song.artist}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlaylistSongs;
