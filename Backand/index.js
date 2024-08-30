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
const corsOptions = {
  origin: 'https://mashups-dbea.vercel.app/', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Server Up and Running on http://localhost:${PORT}`);
});
