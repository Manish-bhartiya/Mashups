const users = require('../models/user');
const bcryptjs = require('bcryptjs');
// const userSchema = require('../models/users');

// exports.getUser = async(req,res) =>{
//     try{
//         const AllUsres = await userSchema.find({})
//         return res.status(200).json({AllUsres,message:"This All our Users"})
//     }
//     catch(err){
//         console.log(err);
//     }
// } 
exports.Signup = async(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin', 'https://mashups-dbea.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    try{
        const {
            name,
            gmail,
            password
        } = req.body;
        const  user = await users.findOne({gmail});
        if(user){
            return res.status(400).json({message:"user already exists"
            })
        }

        const hashpassword = await bcryptjs.hash(password, 10);

        const data = {
            name,
            gmail,
            password : hashpassword
        }
        console.log("we have a new user here ",data);
        const result = await users.create(data);
        return res.status(200).json({message:"User add succesfully ",result});
    }
    catch(err){
        console.log(err.message);
    }
}

exports.Login = async(req,res) =>{
  res.setHeader('Access-Control-Allow-Origin', 'https://mashups-dbea.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        try {
            const {gmail,password} = req.body;
            const user = await users.findOne({gmail});
            const ismatch = await bcryptjs.compare(password,user.password);
            if(!ismatch || !user){
                return res.status(400).json({message:"invalid username or password"});
            }
            else{
                return res.status(200).json({
                    message:"Login successful",
                    user:{
                        _id : user._id,
                        name: user.name,
                        gmail:user.gmail,
                    },
                });
            }
        } catch (error) {
            console.log("Error" + error.message);
            return res.status(500).json({message:"internal server error"});
        }
}
module.exports.deleteUser =  async function deleteUser(req,res){
  res.setHeader('Access-Control-Allow-Origin', 'https://mashups-dbea.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    let dataTobeDeleted = req.body;
    let user = await users.findOneAndDelete(dataTobeDeleted);
    res.json({
        message:"data has been deleted succesfully",
    })
}

exports.addSongInFavorites = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://mashups-dbea.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    const { songId, userId } = req.body;
    try {
      const user = await users.findById(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      // Check if the song is already in favorites
      if (!user.favoriteSongs.includes(songId)) {
        user.favoriteSongs.push(songId);
        await user.save();
        res.status(200).json({
          message: 'Song added to favorites',
          favoriteSongs: user.favoriteSongs,
        });
      } else {
        res.status(200).json({
          message: 'Song is already in favorites',
          favoriteSongs: user.favoriteSongs,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
exports.removeSongFromFavorites = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://mashups-dbea.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    const { songId, userId } = req.query; // Changed to req.query
    try {
      const user = await users.findById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      user.favoriteSongs = user.favoriteSongs.filter(id => id.toString() !== songId);
      await user.save();
  
      res.status(200).json({ message: "Song removed from favorites", favoriteSongs: user.favoriteSongs });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

exports.getFavoriteSongs = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://mashups-dbea.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    const { userId } = req.query;
  
    try {
      const user = await users.findById(userId).populate('favoriteSongs');
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      res.status(200).json({ favoriteSongs: user.favoriteSongs });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };