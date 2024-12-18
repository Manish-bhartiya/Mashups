// App.jsx
import React from "react";
import { Provider } from "react-redux";
import { store } from "./App/store";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import Cart from "./components/Cart";
import PlaylistSongs from "./components/playlistSongs"
import Navbar from "./components/navbar";
import AudioPlayer from "./components/player";
import Album from "./components/albums";
import Home from "./components/home"
import SigninPage from "./components/logInPage";
import SignupPage from "./components/signUp";
import {Toaster }from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectAuthUser } from "./features/authSlice";
import SearchResults from "./components/searchResulst";
import FavoriteSongs from "./components/favorites";
import Userprofile from "./components/userProfile";
import AlbumSongs from "./components/albumSongs";
import SongUploadForm from "./components/songForm";
import CreateAlbum from "./components/albumForm";

const App = () => {
  const authUser = useSelector(selectAuthUser);
  const changePage = useSelector((state) => state.search.changePage);
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Toaster />
          <Navbar />
        <div className=" bg-black min-h-screen">
        {changePage ? (
          <SearchResults />
        ) : (
          <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="/playlist/:playlistName" element={ <PlaylistSongsWrapper /> }/>
            <Route path="/app/:AlbumName" element={<AlbumSongsWrapper/>  }/>
            <Route path="/signin" element={<SigninPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/favorites" element={<FavoriteSongs/>}/>
            <Route path="/profile" element={<Userprofile/>}/>
            <Route path="/Song" element={<SongUploadForm/>}/>
            <Route path="/Album" element={<CreateAlbum/>}/>
          </Routes>
            )}
             {/* <Album/> */}
          <AudioPlayer/>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

const PlaylistSongsWrapper = () => {
  const { playlistName } = useParams();
  return <PlaylistSongs playlistName={playlistName} />;
};

const AlbumSongsWrapper = () => {
  const { AlbumName } = useParams();
  return <AlbumSongs AlbumName={AlbumName} />;
};
export default App;