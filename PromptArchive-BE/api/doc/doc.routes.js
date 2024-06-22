const express = require("express");
const passport = require("passport");
const {
  createDocument,
  getAllDouments,
  getOneDoument,
  updateDocument,
  deleteDocument,
} = require("./doc.controllers");
const router = express.Router();
router.post(
  "/doc",
  passport.authenticate("jwt", { session: false }),
  createDocument
);

router.get(
  "/doc/allDocs",
  passport.authenticate("jwt", { session: false }),
  getAllDouments
);

router.get(
  "/doc/:documentId",
  passport.authenticate("jwt", { session: false }),
  getOneDoument
);

router.put(
  "/doc/:documentId",
  passport.authenticate("jwt", { session: false }),
  updateDocument
);

router.delete(
  "/doc/:documentId",
  passport.authenticate("jwt", { session: false }),
  deleteDocument
);
module.exports = router;
