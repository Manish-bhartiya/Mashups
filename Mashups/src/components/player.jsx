import React, { useRef, useState, useEffect } from 'react';
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { IoIosVolumeHigh } from 'react-icons/io';
import { FaHeart } from "react-icons/fa";

import { useDispatch, useSelector } from 'react-redux';
import { stopAudio, togglePlayPause, prevSong, nextSong } from '../features/audioSlice';
import { FaRegHeart } from "react-icons/fa6";

const AudioPlayer = () => {
  const dispatch = useDispatch();
  const currentSongIndex = useSelector((state) => state.audio.currentSongIndex);
  const isPlaying = useSelector((state) => state.audio.isPlaying);
  const songs = useSelector((state) => state.audio.songs);  

  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleTimeUpdate = () => {
        const current = audio.currentTime;
        const duration = audio.duration;
        setCurrentTime(current);
        setProgress((current / duration) * 100);
      };

      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
      };

      const handleEnded = () => {
        dispatch(nextSong());
        dispatch(togglePlayPause(true));
        
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);

      };
    }
  }, [currentSongIndex, songs]); 
  useEffect(() => {
    if (audioRef.current && currentSongIndex !== null && songs[currentSongIndex]) {
      audioRef.current.src = songs[currentSongIndex].url;
      audioRef.current.play().then(() => {
        dispatch(togglePlayPause(true)); 
      }).catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  }, [currentSongIndex, dispatch, songs]);

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return '00:00';
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const duration = audioRef.current.duration;

    audioRef.current.currentTime = (clickX / width) * duration;
  };

  const handleTogglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      dispatch(togglePlayPause(false));
    } else {
      audioRef.current.play().then(() => {
        dispatch(togglePlayPause(true));
      }).catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      dispatch(stopAudio());
      dispatch(togglePlayPause(false)); 
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  if (currentSongIndex === null || !songs[currentSongIndex]) return null;

  return (
    <div className="fixed flex bottom-0 left-0 right-0 p-4 rounded-md shadow-inner">
      <div className="flex items-center space-x-4">
        <button
          className={`${currentSongIndex > 0 ? 'text-white' : 'text-gray-500'} rounded`}
          onClick={() => {
            dispatch(prevSong());
            if (isPlaying) dispatch(togglePlayPause(true));
          }}
          disabled={currentSongIndex <= 0}
        >
          <FaStepBackward />
        </button>
        <button className="text-white rounded" onClick={handleTogglePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button
          className={`${currentSongIndex < songs.length - 1 ? 'text-white' : 'text-gray-500'} rounded`}
          onClick={() => {
            dispatch(nextSong());
            if (isPlaying) dispatch(togglePlayPause(true));
          }}
          disabled={currentSongIndex >= songs.length - 1}
        >
          <FaStepForward />
        </button>
      </div>
      <div className="ml-3 w-full flex align-middle mt-2 h-2 bg-black cursor-pointer" onClick={handleProgressClick}>
        <div className="h-full bg-white" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="ml-3 flex justify-between text-white">
        <span>{formatTime(currentTime)}</span>
        <span>/</span>
        <span>{formatTime(duration)}</span>
      </div>
     
      <div className="flex items-center ml-6">
        <IoIosVolumeHigh />
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="cursor-pointer ml-2 rounded-lg accent-emerald-100"
        />
      </div>
      <audio ref={audioRef} className="hidden">
        <source src={songs[currentSongIndex]?.url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
