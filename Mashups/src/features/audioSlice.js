import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  songs: [],
  currentSongIndex: null,
  isPlaying: false,
  currentSongId: null,
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
    togglePlayPause: (state, action) => {
      state.isPlaying = action.payload !== undefined ? action.payload : !state.isPlaying;
    },
    stopAudio: (state) => {
      state.isPlaying = false;
      state.currentSongIndex = null;
      state.currentSongId = null;
    },
    setCurrentSongIndex: (state, action) => {
      state.currentSongIndex = action.payload;
      state.currentSongId = state.songs[action.payload]?._id || null;
    },
    setCurrentSongId: (state, action) => {
      const songIndex = state.songs.findIndex((song) => song._id === action.payload);
      if (songIndex !== -1) {
        state.currentSongIndex = songIndex;
        state.currentSongId = action.payload;
      }
    },
    prevSong: (state) => {
      if (state.currentSongIndex > 0) {
        state.currentSongIndex -= 1;
        state.currentSongId = state.songs[state.currentSongIndex]._id;
      }
    },
    nextSong: (state) => {
      if (state.currentSongIndex < state.songs.length - 1) {
        state.currentSongIndex += 1;
        state.currentSongId = state.songs[state.currentSongIndex]._id;
      }
    },
  },
});

export const {
  setSongs,
  togglePlayPause,
  stopAudio,
  setCurrentSongIndex,
  setCurrentSongId,
  prevSong,
  nextSong,
} = audioSlice.actions;

export default audioSlice.reducer;
