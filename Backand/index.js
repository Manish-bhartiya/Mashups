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
app.use(cors());  // Allow all origins (can be customized as needed)

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

app.use('/uploadAudio', cloudinaryRouter); // Prefix routes with `/uploadAudio`

// Environment-defined port (handled automatically by Vercel)
const PORT = process.env.PORT || 3000;

// Make the app listen on the specified port
app.listen(PORT, function () {
  console.log(`Server Up and Running on http://localhost:${PORT}`);
});

