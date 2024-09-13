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
const corsOptions =  {
  
    origin: "http://localhost:4001",
    credentials:true,
    methods: ["GET", "POST"]
  
};

app.use(bodyParser.json());
app.options("",cors(corsOptions));
app.use(cors(corsOptions)); // Apply CORS with specified options

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
