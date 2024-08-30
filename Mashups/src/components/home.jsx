// src/pages/Home.jsx
import React from "react";
import Album from "../components/albums";
import Cart from "../components/Cart";
import LeftSection from "../components/leftsection";
import Navbar from "./navbar";
import FavoriteSongs from "./favorites";

const Home = () => {
  return (
    <div className=" h-screen">
     
      <div className="flex flex-col ">
       
        <Album />
        <Cart />
      </div>
    </div>
  );
};

export default Home;
