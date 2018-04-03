const express = require("express");
const router = express.Router();
const helper = require("../auth/helper.js")

const wikiController = require("../controller/wikiController");



router.get("/wiki", wikiController.index);
router.get("/wiki/new",helper.ensureAuthenticated, wikiController.new);
router.post("/wiki/new",helper.ensureAuthenticated, wikiController.create);
router.get("/wiki/:id", wikiController.show);
router.get("/wiki/:id/edit",helper.ensureAuthenticated, wikiController.edit);
router.post("/wiki/:id/edit",helper.ensureAuthenticated, wikiController.update);
router.post("/wiki/:id/delete",helper.ensureAuthenticated, wikiController.delete);

module.exports = router;
