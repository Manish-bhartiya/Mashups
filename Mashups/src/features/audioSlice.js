import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  songs: [], 
  currentSongIndex: null,
  isPlaying: false,
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setSongs:(state,action)=>{
      state.songs = action.payload;
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    stopAudio: (state) => {
      state.isPlaying = false;
      state.currentSongIndex = null;
    },
    setCurrentSongIndex: (state, action) => {
      state.currentSongIndex = action.payload;
    },
    prevSong: (state) => {
      if (state.currentSongIndex > 0) {
        state.currentSongIndex -= 1;
      }
    },
    nextSong: (state) => {
      if (state.currentSongIndex < state.songs.length - 1) {
        state.currentSongIndex += 1;
      }
    },
  },
});

export const { setSongs,togglePlayPause, stopAudio, setCurrentSongIndex, prevSong, nextSong } = audioSlice.actions;

export default audioSlice.reducer;
