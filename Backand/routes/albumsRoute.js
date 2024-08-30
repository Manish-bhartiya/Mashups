const express = require('express');
const albumtrouter = express.Router();
const albumesController = require('../contorllers/albumesController');

albumtrouter.post('/create', albumesController.createAlbum);
albumtrouter.get('/all', albumesController.getAllAlbums);


module.exports = albumtrouter;
