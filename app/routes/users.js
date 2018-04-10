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
router.get("/users/:id", userController.show);
router.get("/users/:id/upgrade",helper.ensureNormalMember, userController.payment);
router.post("/users/:id/upgrade",helper.ensureNormalMember, userController.upgrade);
router.post("/users/:id/upgrade2",helper.ensureNormalMember, userController.upgrade2);
router.post("/users/:id/downgrade",helper.ensurePremiumMember, userController.downgrade);

module.exports = router;
