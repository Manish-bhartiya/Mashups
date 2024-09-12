const Albums = require('../models/albums');
const Songs = require("../models/songs");

// Function to create a new playlist
const createAlbum = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://mashups-dbea.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  try {
    const { name, image, songs } = req.body;

    if (!name || !image) {
      return res.status(400).json({ message: "Name and image are required" });
    }

    const songDocs = await Songs.insertMany(songs || []);
    const songIds = songDocs.map((song) => song._id);

    const data = { name, image, songs: songIds };
    console.log("Creating Albums with data: ", data);
    const result = await Albums.create(data);
    res.status(201).json({ message: "Albums created successfully", result });
  } catch (err) {
    console.error("Error creating Albums:", err); // Log the error
    res
      .status(500)
      .json({ message: "Error creating Albums", error: err.message });
  }
};

const getAllAlbums = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://mashups-dbea.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    try {
      const albums = await Albums.find().populate("songs");
      res
        .status(200)
        .json({ albums, message: "Fetched all playlists successfully" });
    } catch (error) {
      console.error("Error fetching playlists:", error); // Log the error
      res
        .status(500)
        .json({ message: "Error fetching playlists", error: error.message });
    }
  };
  


module.exports = {
   createAlbum,
   getAllAlbums
  };