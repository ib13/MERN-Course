const express = require("express");
const mongoose = require("mongoose");

const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
// To connect our database

app.get("/", (req, res) => res.send("Hello World"));
//                                   What to show
const port = process.env.PORT || 5000;
// Port to run

app.listen(port, () => console.log("Server running"));
