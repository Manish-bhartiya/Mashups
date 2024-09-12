// uploadFileHandler.js
const cloudinary = require('cloudinary').v2;
const cloudinaryUploader = require('../utils/imageUploder')



const handleUpload = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://mashups-dbea.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // Check for any file validation errors from multer
  if (req.fileValidationError) {
    return res.status(400).json({ message: `File validation error: ${req.fileValidationError}` });
  }

  // Invoke the uploader function to handle the upload to Cloudinary
  const audioResponse = await cloudinaryUploader(req, res);
  console.log(audioResponse);

  // Send response with audio response from Cloudinary
  return res.status(200).json({ audioResponse: audioResponse.secure_url });
};

module.exports = handleUpload;
