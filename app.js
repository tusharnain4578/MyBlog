const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const fs = require("fs");
const { json } = require("express/lib/response");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 3000;

//Array of obj
let posts = [];

LoadHomeBlogs=()=>{
  fs.readFile("./data/blogs.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    } else console.log('Data file read successful');
    if (jsonString!=="")
    posts = JSON.parse(jsonString);
  });
}
LoadHomeBlogs();

app.get("/", (req, res) => {
  
  LoadHomeBlogs();
  res.render("home", { posts: posts });
});

var flag;

app.get("/admin", (req, res) => {
  flag = false;

  res.render("blog-admin", { flag: flag });
});

app.post("/blog/:title", (req, res) => {
  for (var i = 0; i < posts.length; i++) {
    if (req.params.title === posts[i].kebabTitle) {
      res.render("blog", { post: posts[i] });
      break;
    }
  }

  if (i === posts.length) res.send("NOT FOUND!!!");
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
  let thisPost = {
    date: date,
    title: title,
    post: post,
    kebabTitle: _.kebabCase(title),
  };
  posts.push(thisPost);

  //Saving data(posts) in json file

  fs.readFile("./data/blogs.json", "utf8", (err, jsonString) => {
    if (err) console.log("File read failed:", err);
    let data = JSON.parse(jsonString);
    if(data!=="")
    data.push(thisPost);
  });

  let stringifiedPosts = JSON.stringify(posts);
  fs.writeFile("./data/blogs.json", stringifiedPosts, (err) => {
    if (err) console.log("The error is ==>> " + err);
    else console.log("successfully written file in blogs.json");
  });

  res.render("blog-admin", { flag: flag });
});

app.listen(PORT, () => console.log(`App is online on port ${PORT}.`));

// app.get("/demo", (req, res) => {
//   res.send(req.query.name + " " + req.query.age);
// });
