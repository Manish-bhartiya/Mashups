import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { apiconnecter } from "../services/apiconnecter";

export const fetchResults = createAsyncThunk('search/fetchSearchResults', async (term) => {
    try {
        console.log(term);
        // const response = await axios.get(`http://localhost:4001/api/searchsongs?term=${term}`);
        const response = await apiconnecter('get',`search/searchsongs?term=${term}`);

        console.log(response.data);  // Check what the API is returning
        return response.data;
    } catch (error) {
        console.error(error);  // Log the error if it occurs
        throw new Error('Failed to fetch search results');
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
