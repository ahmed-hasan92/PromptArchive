const express = require("express");
const {
  register,
  logIn,
  getMyData,
  changeMyPassword,
  deleteMyAccount,
} = require("./user.controllers");
const passport = require("passport");
const router = express.Router();

router.post("/user/register", register);
router.post(
  "/user/login",
  passport.authenticate("local", { session: false }),
  logIn
);

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  getMyData
);

router.put(
  "/user/changePassword",
  passport.authenticate("jwt", { session: false }),
  changeMyPassword
);

router.delete(
  "/user/deleteAcc",
  passport.authenticate("jwt", { session: false }),
  deleteMyAccount
);

module.exports = router;
