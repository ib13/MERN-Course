const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

const app = express();

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// To access req.body.___

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
// To connect our database

// const logger = (res, req, next) => {
//   console.log("Running");
//   next();
// };

// app.use(logger);

app.get("/", (req, res) => res.send("Hello World!"));
//                                   What to show

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
// URL to go to these pages

const port = 5000;
// Port to run

app.listen(port, () => console.log(`Server running on port ${port}.`));
