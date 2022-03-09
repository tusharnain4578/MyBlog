const express = require("express");
const route = express.Router();
// require("dotenv").config();
const model = require("../model");
const bcrypt = require("bcryptjs");

route.get("/", (req, res) => {
  res.render("register", {
    layout: false,
  });
});

route.post("/", (req, res) => {
  let msgArr = [];
  // console.log(req.body);
  const { name, email, password, repassword } = req.body;
  if (!name || !email || !password || !repassword) {
    msgArr.push({ type: "danger", msg: "All fields are required!" });
  } else {
    if (password.length < 8) {
      msgArr.push({ type: "danger", msg: "Password should be atleast 8 characters" });
    }

    if (password !== repassword) {
      msgArr.push({ type: "danger", msg: "Passwords are not matching!" });
    }

    if (msgArr.length === 0) {
      model.users.findOne({ email: email }).then((user) => {
        if (user) {
          msgArr.push({ type: "danger", msg: "Email already registered!" });
          res.render("register", { msg: msgArr, name: name, email: email, layout: false });
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, async (err, hash) => {
              const thisUser = new model.users({
                name: req.body.name,
                email: req.body.email,
                password: hash,
              });

              const rc = await thisUser.save();
              console.log(rc);
              msgArr.push({ type: "success", msg: "You are registered! Now you can log in." });
              req.flash("msg", msgArr);
              res.redirect("/login");
            });
          });
        }
      });
    }
  }
  if (msgArr.length !== 0) {
    res.render("register", { msg: msgArr, name: name, email: email, layout: false });
  }
});

module.exports = route;
