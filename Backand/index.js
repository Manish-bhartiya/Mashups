const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const cloudinaryRouter = require('./routes/cloudyneryRoute');
const db = require('./connection/dbconnection');
const playlistrouter = require('./routes/playlistRoute');
const songrouter = require('./routes/songRoute');
const albumtrouter = require('./routes/albumsRoute');
const userRoute = require('./routes/userRoute');
const searchRoute = require('./routes/serch');

// Initialize dotenv to read environment variables
dotenv.config();

// Create an instance of express
const app = express();

// Middleware setup
app.use(bodyParser.json());

// Configure CORS to allow requests from your frontend
const corsOptions = {
  origin: 'https://mashups-dbea.vercel.app', // Your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Ensure OPTIONS is included
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers you expect to be used
  credentials: true, // Allow credentials to be sent with the requests
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Handle OPTIONS requests
app.options('*', cors(corsOptions));

// MongoDB database connection
db();

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello There" });
});

app.use("/mashup", playlistrouter);
app.use("/api", songrouter);
app.use("/album", albumtrouter);
app.use("/user", userRoute);
app.use("/search", searchRoute);
app.use('/uploadAudio', cloudinaryRouter);

// Environment-defined port (handled automatically by Vercel)
const PORT = process.env.PORT || 3000;

// Make the app listen on the specified port
app.listen(PORT, function () {
  console.log(`Server Up and Running on http://localhost:${PORT}`);
});
