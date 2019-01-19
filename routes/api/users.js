const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs"); //To encrypt password

// Load User model
const User = require("../../models/User");

// @route GET api/users/test
router.get("/test", (req, res) => res.json({ msg: "User Works" }));
// This link is after the link to this page

// @route GET api/users/register
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email exist" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save() //To save to DB
            .then(user => res.json(user)) //To respond the user
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route GET api/users/login
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //   Check if email exist
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        res.json({ msg: "Success" });
      } else {
        return res.status(400).json({ password: "Incorrect Password" });
      }
    });
  });
});

module.exports = router;
