const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");



router.get("/user/signup", userController.signUp);
router.post("/user/signup", userController.signUpPost);
router.post("/user/create", userController.create);

module.exports = router;
