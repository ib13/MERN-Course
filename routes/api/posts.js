const express = require("express");
const router = express.Router();

// @route GET api/posts/test
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));
// This link is after the link to this page

module.exports = router;
