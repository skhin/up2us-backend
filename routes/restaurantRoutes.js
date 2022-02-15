const express = require("express");
const router = express.Router();
const { getRestaurant, addRestaurant } = require("../controllers/Restaurant");
const { requireSignin } = require("../middleware/index");

router.post("/restaurant/addrestaurant", requireSignin, addRestaurant);
router.get("/restaurant/getrestaurant", requireSignin, getRestaurant);

module.exports = router;
