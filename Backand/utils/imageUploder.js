const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const dotenv = require('dotenv');

// Initialize dotenv to read environment variables
dotenv.config();

cloudinary.config({
  api_key: process.env.API_KEY,
  cloud_name: process.env.CLOUD_NAME,
  api_secret: process.env.API_SECRET,
});

const cloudinaryUploader = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto', // Automatically detects the file type
    });

    // Safely delete the local file after successful upload
    try {
      fs.unlinkSync(filePath);
    } catch (deleteError) {
      console.error('Error deleting temporary file:', deleteError.message);
    }

    return { success: true, result };
  } catch (error) {
    console.error('Cloudinary upload error:', error.stack || error.message);
    return { success: false, error: error.message || error };
  }
};

module.exports = cloudinaryUploader;
