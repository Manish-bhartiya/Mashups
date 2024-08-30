const express = require('express');
const { createSong, getAllSongs, getSongById } = require('../contorllers/songController')
const handleUpload = require('../contorllers/uploadFileHandler')
const router = express.Router();
const multerUpload = require('../utils/multer');
const upload = require('../utils/multer');

// Song routes
router.post('/createsongs',upload,createSong); 
router.get('/songs', getAllSongs);
router.get('/songs/:id', getSongById);

module.exports = router;
//

