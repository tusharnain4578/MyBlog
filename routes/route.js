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
const passport = require("passport");

//auth
const { ensureAuthenticated } = require("../auth");

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

route.get("/admin", ensureAuthenticated, (req, res) => {
  flag = false;

  model.posts.find((err, posts) => {
    if (err) console.log(err);
    res.render("blog-admin", { flag: flag, name: req.user.name, posts: posts });
  });
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

  res.send({ msg: "deleted successfully" });
});

route.get("/post-blog", ensureAuthenticated, (req, res) => {
  res.redirect("/admin");
});

route.post("/post-blog", ensureAuthenticated, async (req, res) => {
  // let title = req.body.title;
  // let post = req.body.post;
  const { username, title, post } = req.body;
  // console.log(username);
  console.log(req.body);
  let date = new Date().toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  flag = true;

  const thisPost = new model.posts({
    username,
    title,
    post,
    date,
    kebabTitle: _.kebabCase(title),
  });

  model.posts.findOne({ kebabTitle: thisPost.kebabTitle }, (err, post) => {
    if (err) console.log(err);
    if (!post) {
      thisPost.save();
    }
  });

  model.posts.find((err, posts) => {
    if (err) console.log(err);
    // res.render("blog-admin", { flag: flag, name: username, posts: posts });
    res.send({ flag: flag });
  });
});

route.use("/register", require("./register"));

route.get("/login", (req, res) => {
  var msgArr = req.flash("msg");

  msgArr.push({ type: "danger", msg: req.flash("error") });
  msgArr.push({ type: "danger", msg: req.flash("error_msg") });
  msgArr = msgArr.filter((el) => {
    return el.msg.length > 0;
  });

  res.render("login", { msg: msgArr });
});

route.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.render("login", { msg: [{ type: "danger", msg: "Missing Credentials" }], email: email });
  } else {
    passport.authenticate("local", {
      successRedirect: "/admin",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res, next);
  }
});

// Logout
route.get("/logout", (req, res) => {
  req.logout();
  req.flash("msg", [{ type: "success", msg: "You're logged out!" }]);
  res.redirect("/login");
});

module.exports = route;
