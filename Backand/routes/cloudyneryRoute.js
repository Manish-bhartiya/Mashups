const express = require('express');
const upload = require('../utils/multer');
const handleUpload = require('../contorllers/uploadFileHandler');

const cloudinaryRouter = express.Router();

// Route to handle posting of files and the upload
cloudinaryRouter.post('/uploadAudio', upload, handleUpload);

module.exports = cloudinaryRouter;
