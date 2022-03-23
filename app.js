const express = require("express");
const route = require("./routes/route");
const passport = require("passport");
const session = require("express-session");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// require("dotenv").config();

const app = express();

// Passport Config
require("./passport")(passport);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(errorHandlerMiddleware);

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 24 * 60 * 60 * 1000,
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/", route);

app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB("mongodb+srv://naintushar:tushar123@myblog.edl2v.mongodb.net/myblog");
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
// mongodb://127.0.0.1:27017/myblog
