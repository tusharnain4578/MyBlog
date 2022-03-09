const express = require("express");
const route = require("./routes/route");
const passport = require("passport");
const session = require("express-session");
// require("dotenv").config();

const app = express();

// Passport Config
require("./passport")(passport);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/", route);

app.listen(process.env.PORT, () => console.log(`App is online on port ${process.env.PORT}.`));
