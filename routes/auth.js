const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const {login} = require("../controller/auth");
const {loginValidator} = require("../validators/auth");
const { createUserValidator } = require("../validators/user");
const validateInput = require("../validators/validateInput");

router.post("/register", createUserValidator, validateInput, authController.register);
router.post("/login", loginValidator, validateInput, authController.login);

module.exports = router;