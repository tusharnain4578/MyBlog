const mongoose = require("mongoose");
require("dotenv").config();

//MONGODB Connection
// mongodb+srv://naintushar:tushar123@myblog.edl2v.mongodb.net/myblog
// mongodb://127.0.0.1:27017/myblog
mongoose.connect("mongodb+srv://naintushar:tushar123@myblog.edl2v.mongodb.net/myblog");

//Posts Collection Model
const blogSchema = new mongoose.Schema({
  username: String,
  title: String,
  post: String,
  date: String,
  kebabTitle: String,
});

const posts = mongoose.model("post", blogSchema);

//Users Collection Model

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const users = mongoose.model("user", userSchema);

module.exports = { posts, users };
