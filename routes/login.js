const express = require("express");
const route = express.Router();
// require("dotenv").config();
const model = require("../model");
const bcrypt = require("bcryptjs");

route.get("/", (req, res) => {
  res.render("login", { msg: req.flash("msg"), layout: false });
});

module.exports = route;
