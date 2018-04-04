const express = require("express");
const router = express.Router();
const helper = require("../auth/helper.js")

const userController = require("../controller/userController");



router.get("/user/signup", userController.signUp);
router.post("/user/signup", userController.signUpPost);
router.post("/user/create", userController.create);
router.get("/user/signin", userController.signIn);
router.post("/user/signin", userController.signInPost);
router.get("/user/signout", userController.signOut);
router.get("/user/:id", userController.show);
router.get("/user/:id/upgrade",helper.ensureNormalMember, userController.payment);
router.post("/user/:id/upgrade",helper.ensureNormalMember, userController.upgrade);
router.post("/user/:id/downgrade",helper.ensurePremiumMember, userController.downgrade);

module.exports = router;
