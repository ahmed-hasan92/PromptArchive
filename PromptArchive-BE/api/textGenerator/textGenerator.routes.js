const express = require("express");
const passport = require("passport");
const { generateText } = require("./textGenerator.controllers");

const router = express.Router();
router.post(
  "/generate",
  passport.authenticate("jwt", { session: false }),
  generateText
);
module.exports = router;
