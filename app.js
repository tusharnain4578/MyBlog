const express = require("express");
const route = require("./routes/route");
// require("dotenv").config();

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", route);

app.listen(process.env.PORT, () => console.log(`App is online on port ${process.env.PORT}.`));
