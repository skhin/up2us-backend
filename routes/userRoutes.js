const express = require("express");
const router = express.Router();
const {
  addHistory,
  removeFromHistory,
  getHistory,
  addReview,
  // getDietRest,
  getOptions,
  dietRestriction,
  favCuisine,
  getFavCuisine,
  nonFavCuisine,
  getNonFavCuisine,
  favLocation,
  favEstab,
  blacklist,
  getBlacklist,
} = require("../controllers/userSetting");

router.post("/history/addhistory", addHistory); //  able to read
router.post("/history/removefromhistory", removeFromHistory); // not receiving
router.get("/history/gethistory/:id", getHistory); // able to read
router.post("/history/addreview", addReview); // pass

router.get("/user/getoption/:id", getOptions); //[];
router.post("/user/dietrestriction", dietRestriction); // able to read

router.post("/user/favcuisine", favCuisine); // pass
router.get("/user/getfavcuisine/:id", getFavCuisine); // []
router.post("/user/nonfavcuisine", nonFavCuisine); // pass
router.get("/user/getnonfavcuisine/:id", getNonFavCuisine); // []

router.post("/user/favlocation", favLocation); // able to read
router.get("/user/favestab/:id", favEstab); // []

router.post("/user/blacklist", blacklist); // able to read
router.get("/user/getblacklist/:id", getBlacklist); // []

module.exports = router;
