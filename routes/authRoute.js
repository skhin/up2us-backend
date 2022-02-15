const express = require("express");
const { signin, signup } = require("../controllers/Auth");
const {
  validateSignInRequest,
  validateSignUpRequest,
  isRequestValidated,
} = require("../validator/validator");
const router = express.Router();

router.post("/user/signup", validateSignUpRequest, isRequestValidated, signup);
router.post("/user/signin", validateSignInRequest, isRequestValidated, signin);

module.exports = router;
