const Songs = require('../models/songs');
const cloudinaryUploader = require('../utils/imageUploder');

const createSong = async (req, res) => {
  try {
    const { name, image, artist } = req.body;
    const file = req.file;

    if (!name || !image || !artist || !file) {
      return res.status(400).json({ message: "All song fields are required" });
    }

    if (req.fileValidationError) {
      return res.status(400).json({ message: `File validation error: ${req.fileValidationError}` });
    }

    // Invoke the uploader function to handle the upload to Cloudinary
    const { success, result, error } = await cloudinaryUploader(req,res);

    if (!success) {
      return res.status(500).json({ message: `Cloudinary upload error: ${error.message}` });
    }

    const song = new Songs({
      name,
      image,
      artist,
      url: result.secure_url // Use the URL from Cloudinary
    });

    await song.save();
    res.status(201).json({ message: "Song created successfully", song });
  } catch (error) {
    console.error('Error creating song:', error);
    res.status(500).json({ message: "Error creating song", error: error.message });
  }
};

const getAllSongs = async (req, res) => {
  try {
    const songs = await Songs.find();
    res.status(200).json({ songs, message: "Fetched all songs successfully" });
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ message: "Error fetching songs", error: error.message });
  }
};

const getSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Songs.findById(id);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json({ song });
  } catch (error) {
    console.error('Error fetching song:', error);
    res.status(500).json({ message: "Error fetching song", error: error.message });
  }
};

module.exports = {
  createSong,
  getAllSongs,
  getSongById,
};