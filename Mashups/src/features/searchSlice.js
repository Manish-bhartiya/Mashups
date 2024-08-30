import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchResults = createAsyncThunk('search/fetchSearchResults', async(term)=>{
        try {
            const response = await axios.get(`https://mashups-nine.vercel.app/search/search?term=${term}`);
            return response.data;
        } catch (error) {
            throw new error('Failed to fetch search results');
        }
});

const searchSlice = createSlice({
    name:'search',
    initialState:{
        songs:[],
        playlists:[],
        status:'idle',
        changePage:false,
        error:null,
    },
    reducers:{
        togglePage: (state, action) => {
            state.changePage = action.payload;
          },
    },
    extraReducers:(builder) =>{
        builder
        .addCase(fetchResults.pending,(state) =>{
            state.status = 'loading'
        })
        .addCase(fetchResults.fulfilled,(state,action) =>{
            state.status = 'succeeded';
            state.songs = action.payload.songs;
            state.playlists = action.payload.playlists;
        })
        .addCase(fetchResults.rejected,(state,action) =>{
            state.status = 'failed',
            state.status = action.error.message;
        });
    },
});

export const {togglePage } = searchSlice.actions;


export default searchSlice.reducer;
