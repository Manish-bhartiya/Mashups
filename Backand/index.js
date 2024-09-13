const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cloudinaryRouter = require('./routes/cloudyneryRoute');
const db = require('./connection/dbconnection');
const playlistrouter = require('./routes/playlistRoute');
const songrouter = require('./routes/songRoute');
const albumtrouter = require('./routes/albumsRoute');
const userRoute = require('./routes/userRoute');
const searchRoute = require('./routes/serch');

dotenv.config();

const app = express();

// Custom middleware to set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next(); // Proceed to the next middleware or route handler
});

// Handle preflight requests
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(204); // Respond with no content for OPTIONS requests
});

// Use bodyParser.json() instead of express.json()
app.use(bodyParser.json());

// Initialize database connection
db();

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello There" });
});

app.use("/api", playlistrouter);
app.use("/api", songrouter);
app.use("/api", albumtrouter);
app.use("/api", userRoute);
app.use("/api", searchRoute);
app.use('/api', cloudinaryRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server Up and Running on http://localhost:${PORT}`);
});
