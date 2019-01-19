const express = require("express");
const router = express.Router();

// @route  GET api/profile/test
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));
// This link is after the link to this page

module.exports = router;
