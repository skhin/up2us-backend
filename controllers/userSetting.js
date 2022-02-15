const UserSetting = require("../model/UserSetting");
const Restaurant = require("../model/Restaurant");
const DietRest = require("../model/dietRest");
const FavCuisine = require("../model/FavCuisine");
const NonFavCuisine = require("../model/NonFavCuisine");
const FavLocation = require("../model/FavLoc");
const Blacklist = require("../model/Blacklist");

///////////////////////////////////////////////////////////
// ADDING ESTABLISHMENT TO VISITED LOCATION IN USER PROFILE
///////////////////////////////////////////////////////////

exports.addHistory = async (req, res) => {
  try {
    const history = await UserSetting.findOne({ userId: req.body.userId });

    if (history) {
      const doesExist = history.restaurants.some(
        (item) => item.name === req.body.restaurants.name
      );

      if (!doesExist) {
        await UserSetting.findOneAndUpdate(
          { userId: req.body.userId },
          {
            $push: {
              restaurants: req.body.restaurants,
            },
          }
        );
        res
          .status(200)
          .json({ message: "Restaurant has been successfully added" });
      } else {
        res.status(200).json({ message: "Restaurant has already been added" });
      }
    } else {
      await new UserSetting(req.body).save();
      res.status(200).json({ message: "First restaurant added" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong with ADDING restaurant", error });
  }
};

////////////////////////////////////////////////////////////////////////
// REMOVING ESTABLISHMENT FROM VISITED LOCATION ON RESERVATION (CANCEL)
////////////////////////////////////////////////////////////////////////

exports.removeFromHistory = async (req, res) => {
  try {
    const history = await UserSetting.findOne({ userId: req.body.userId });

    if (history) {
      await UserSetting.findOneAndUpdate(
        { userId: req.body.userId },
        {
          $pull: {
            restaurants: { restId: req.body.restId },
          },
        }
      );
      res.status(200).json({ message: "Restaurant removed" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong with REMOVING restaurant",
      error,
    });
  }
};

///////////////////////////////
// HISTORY OF VISITED LOCATION
///////////////////////////////

exports.getHistory = async (req, res) => {
  try {
    const history = await UserSetting.findOne({ userId: req.params.id });
    res.status(200).json(history.restaurants);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong with HISTORY", error });
  }
};

///////////////////////////////////
// ADDING REVIEW OF ESTABLISHMENT
///////////////////////////////////

exports.addReview = async (req, res) => {
  try {
    await Restaurant.findOneAndUpdate(
      { _id: req.body.restId },
      {
        $set: { review: req.body.review },
      }
    );
    res.status(200).json({ message: "REVIEW ADDED" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong with ADDING REVIEW", error });
  }
};

//////////////////////////////
// GET DIETARY RESTRICTION
//////////////////////////////

exports.getOptions = async (req, res) => {
  try {
    const options = await DietRest.findOne({ userId: req.params.id });
    if (options) {
      res.status(200).json(options.option);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong with GETTING DIETARY RESTRICTIONS",
      error,
    });
  }
};

//////////////////////////////
// ADDING DIETARY RESTRICTION
//////////////////////////////

exports.dietRestriction = async (req, res) => {
  try {
    const available = await DietRest.findOneAndUpdate({
      userId: req.body.userId,
    });
    if (available) {
      await DietRest.findOneAndUpdate(
        { userId: req.body.userId },
        { option: req.body.option },
        { new: true }
      );
      res.status(200).json({ message: "DIETARY RESTRICTIONS updated", error });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong with DIETARY RESTRICTIONS Update",
      error,
    });
  }
};

//////////////////////////////
// ADDING FAV CUISINE
//////////////////////////////

exports.favCuisine = async (req, res) => {
  try {
    const available = await FavCuisine.findOneAndUpdate({
      userId: req.body.userId,
    });
    if (available) {
      await FavCuisine.findOneAndUpdate(
        { userId: req.body.userId },
        { option: req.body.option },
        { new: true }
      );
      res.status(200).json({ message: "FAV CUISINE updated" });
    } else {
      await new FavCuisine(req.body).save();
      res.status(200).json({ message: "NEW FAV CUISINE saved" });
    }
  } catch (error) {
    res.status(500).JSON({
      message: "Something went wrong with ADDING NEW FAV CUISINE",
      error,
    });
  }
};

//////////////////////////////
// GETTING FAV CUISINE
//////////////////////////////

exports.getFavCuisine = async (req, res) => {
  try {
    const options = await FavCuisine.findOne({ userId: req.params.id });
    if (options) {
      res.status(200).json(options.option);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong with GETTING FAV CUISINE",
      error,
    });
  }
};

//////////////////////////////
// ADDING NON FAV CUISINE
//////////////////////////////

exports.nonFavCuisine = async (req, res) => {
  try {
    const available = await NonFavCuisine.findOneAndUpdate({
      userId: req.body.userId,
    });
    if (available) {
      await NonFavCuisine.findOneAndUpdate(
        { userId: req.body.userId },
        { option: req.body.option },
        { new: true }
      );
      res.status(200).json({ message: "NON FAV CUISINE UPDATED" });
    } else {
      await new NonFavCuisine(req.body).save();
      res.status(200).json({ message: "NON FAV CUISINE ADDED" });
    }
  } catch (error) {
    console.log("error1", error);

    res
      .status(500)
      .json(
        { message: "Something went wrong with NON FAV CUISINE UPDATE" },
        error
      );
  }
};

//////////////////////////////
// GETTING NON FAV CUISINE
//////////////////////////////

exports.getNonFavCuisine = async (req, res) => {
  try {
    const options = await NonFavCuisine.findOne({ userId: req.params.id });
    if (options) {
      res.status(200).json(options.option);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong with GETTING NON FAV CUISINE",
      error,
    });
  }
};

////////////////////////////////////////
// ADDING ESTABLISHMENT TO FAV LOCATION
////////////////////////////////////////

exports.favLocation = async (req, res) => {
  try {
    const available = await FavLocation.findOne({ userId: req.body.userId });
    if (available) {
      const doesExist = available.favLoc.some(
        (item) => item.loc === req.body.favLoc.loc
      );
      if (!doesExist) {
        await FavLocation.findOneAndUpdate(
          { userId: req.body.userId },
          {
            $push: {
              favLoc: { loc: req.body.favLoc.loc, add: req.body.favLoc.add },
            },
          }
        );
        res.status(200).json({ message: "Restaurant added to FAV LOCATION" });
      } else {
        res.status(200).json({ message: "Restaurant has already been ADDED" });
      }
    } else {
      await new FavLocation(req.body).save();
      res
        .status(200)
        .json({ message: "Restaurant successfully added to FAV LOCATION" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong with ADDING TO FAV LOCATION",
      error,
    });
  }
};

////////////////////////////////////////
// GETTING FAV ESTABLISHMENT
////////////////////////////////////////

exports.favEstab = async (req, res) => {
  try {
    const favEstab = await FavLocation.findOne({ userId: req.params.id });
    if (favEstab) {
      res.status(200).json(favEstab.favLoc);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong with GETTING FAV ESTABLISHMENT",
      error,
    });
  }
};

////////////////////////////////////////
// ADDING ESTABLISHMENT TO BLACKLIST
////////////////////////////////////////

exports.blacklist = async (req, res) => {
  try {
    const available = await Blacklist.findOne({ userId: req.body.userId });
    if (available) {
      const doesExist = available.favLoc.some(
        (item) => item.loc === req.body.favLoc.loc
      );
      if (!doesExist) {
        await Blacklist.findOneAndUpdate(
          { userId: req.body.userId },
          {
            $push: {
              favLoc: { loc: req.body.favLoc.loc, add: req.body.favLoc.add },
            },
          }
        );
        res.status(200).json({ message: "Restaurant ADDED to BLACKLIST" });
      } else {
        res
          .status(200)
          .json({ message: "Restaurant ALREADY ADDED to BLACKLIST" });
      }
    } else {
      await new Blacklist(req.body).save();
      res.status(200).json({ message: "Restaurant SAVED to BLACKLIST" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong with ADDING to BLACKLIST",
      error,
    });
  }
};

////////////////////////////////////////
// GETTING BLACKLIST ESTABLISHMENT
////////////////////////////////////////

exports.getBlacklist = async (req, res) => {
  try {
    const favEstab = await Blacklist.findOne({ userId: req.params.id });
    if (favEstab) {
      res.status(200).json(favEstab.favLoc);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong with GETTING BLACKLIST ESTABLISHMENT",
      error,
    });
  }
};
