const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");



router.get("/user/signup", userController.signUp);
router.post("/user/signup", userController.signUpPost);
router.post("/user/create", userController.create);
router.get("/user/signin", userController.signIn);
router.post("/user/signin", userController.signInPost);
router.get("/user/signout", userController.signOut);

module.exports = router;
