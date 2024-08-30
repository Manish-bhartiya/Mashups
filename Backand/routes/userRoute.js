const express = require("express");
const { Signup,Login,deleteUser, addSongInFavorites, removeSongFromFavorites, getFavoriteSongs } = require("../contorllers/userscontroller");
const userRoute = express.Router();


userRoute.post("/signup",Signup);
userRoute.post("/login",Login);
userRoute.delete("/user",deleteUser);

userRoute.post("/addFavorite",addSongInFavorites);
userRoute.delete("/removeFavorite",removeSongFromFavorites);
userRoute.get("/getFavorites",getFavoriteSongs);

module.exports = userRoute;