const mongoose = require("mongoose");

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
