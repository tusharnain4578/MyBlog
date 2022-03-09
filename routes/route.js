const express = require("express");
const route = express.Router();
// require("dotenv").config();
const model = require("../model");
const _ = require("lodash");
const expressLayouts = require("express-ejs-layouts");
const bcrypt = require("bcryptjs");
const req = require("express/lib/request");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

route.use(expressLayouts);
route.use(cookieParser());
route.use(
  session({
    secret: "Umaiwa No Shindoru",
    resave: false,
    saveUninitialized: true,
  })
);
route.use(flash());

route.get("/", (req, res) => {
  model.posts.find((err, posts) => {
    if (err) console.log(err);
    else res.render("home", { posts: posts });
  });
});

var flag;

route.get("/admin", (req, res) => {
  flag = false;

  res.render("blog-admin", { flag: flag });
});

route.post("/blog/:id", (req, res) => {
  model.posts.find({ _id: req.params.id }, (err, post) => {
    if (err) console.log(err);
    else res.render("blog", { post: post[0] });
  });
});

route.post("/blog/delete/:id", (req, res) => {
  model.posts.findByIdAndDelete(req.params.id, (err, posts) => {
    if (err) console.log(err);
    else console.log("Record deleted successfully");
  });

  res.redirect("/");
});

route.get("/post-blog", (req, res) => {
  res.redirect("/admin");
});

route.post("/post-blog", async (req, res) => {
  let title = req.body.title;
  let post = req.body.post;

  let date = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  flag = true;

  const thisPost = new model.posts({
    title,
    post,
    date,
    kebabTitle: _.kebabCase(title),
  });

  const rc = await thisPost.save();
  console.log(rc);

  res.render("blog-admin", { flag: flag });
});

route.use("/register", require("./register"));

route.use("/login", require("./login"));

module.exports = route;
