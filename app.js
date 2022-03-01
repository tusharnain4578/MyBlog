const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 3000;

//MONGODB Connection
// const dbPassword = "12341234";
const DBURL = "mongodb://127.0.0.1:27017/myblog";
mongoose.connect(DBURL);

const blogSchema = new mongoose.Schema({
  title: String,
  post: String,
  date: String,
  kebabTitle: String,
});

const posts = mongoose.model("post", blogSchema);

app.get("/", (req, res) => {
  posts.find((err, posts) => {
    if (err) console.log(err);
    else res.render("home", { posts: posts });
  });
});

var flag;

app.get("/admin", (req, res) => {
  flag = false;

  res.render("blog-admin", { flag: flag });
});

app.post("/blog/:id", (req, res) => {
  posts.find({ _id: req.params.id }, (err, post) => {
    if (err) console.log(err);
    else res.render("blog", { post: post[0] });
  });
});

app.post("/blog/delete/:id", (req, res) => {
  posts.findByIdAndDelete(req.params.id, (err, posts) => {
    if (err) console.log(err);
    else console.log("Record deleted successfully");
  });

  res.redirect("/");
});

app.get("/post-blog", (req, res) => {
  res.redirect("/admin");
});

app.post("/post-blog", (req, res) => {
  let title = req.body.title;
  let post = req.body.post;

  let date = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  flag = true;

  const thisPost = new posts({
    title: title,
    post: post,
    date: date,
    kebabTitle: _.kebabCase(title),
  });

  thisPost.save();

  res.render("blog-admin", { flag: flag });
});

app.listen(process.env.PORT || PORT, () => console.log(`App is online on port ${PORT}.`));

// app.get("/demo", (req, res) => {
//   res.send(req.query.name + " " + req.query.age);
// });
