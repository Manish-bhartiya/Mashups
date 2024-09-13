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

dotenv.config();

const app = express();

// Configure CORS to allow requests from your frontend domain
// const corsOptions = new Server(server, {
//   cors: {
//     origin: "*",
//     credentials:true,
//     methods: ["GET", "POST"]
//   }
// });

app.use(bodyParser.json());
app.use(cors({
<<<<<<< HEAD
  origin: 'https://mashups-dbea.vercel.app', // Set your frontend URL here
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // Allow cookies and authentication headers
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify the allowed headers
}));
=======
      credentials:true
  allowedHeaders:{
    "origin":"*",
     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
  },
})); // Apply CORS with specified options
>>>>>>> b39f4ffd03011fb62c494e1939281e95228c79c9

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
