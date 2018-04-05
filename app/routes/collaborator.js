const express = require("express");
const router = express.Router();
const helper = require("../auth/helper.js")
const collabController = require("../controller/collabController");



router.post("/wiki/:id/collab/add", collabController.add);
router.post("/wiki/:id/collab/subtract", collabController.subtract);

module.exports = router;
