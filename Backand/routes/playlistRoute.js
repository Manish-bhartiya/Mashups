const express = require('express');
const playlistrouter = express.Router();
const playlistController = require('../contorllers/playlistcontorller');

playlistrouter.post('/create', playlistController.createPlaylist);
playlistrouter.get('/all', playlistController.getAllPlaylists);
playlistrouter.post('/  ', playlistController.addSongsToPlaylist);
playlistrouter.post('/get-by-name', playlistController.getPlaylistByName);
playlistrouter.get('/:playlistName', playlistController.getSongsByPlaylistName);

module.exports = playlistrouter;
        