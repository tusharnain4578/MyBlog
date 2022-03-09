const mongoose = require("mongoose");
require("dotenv").config();

//MONGODB Connection
mongoose.connect(process.env.DBURL);

//Posts Collection Model
const blogSchema = new mongoose.Schema({
  title: String,
  post: String,
  date: String,
  kebabTitle: String,
});

const posts = mongoose.model("post", blogSchema);

//Users Collection Model

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const users = mongoose.model("user", userSchema);

module.exports = { posts, users };
