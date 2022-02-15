const Restaurant = require("../model/Restaurant");

////////////////////////////////////////
// ADDING RESTAURANT TO DATABASE
////////////////////////////////////////

exports.addRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ name: req.body.name });
    if (restaurant) {
      return res
        .status(200)
        .json({ message: "Restaurant is already in database" });
    }
    await new Restaurant(req.body).save();
    res.status(200).json({ message: "Restaurant SAVED to database" });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong with ADDING new restaurant to database",
      error,
    });
  }
};

////////////////////////////////////////
// GET RESTAURANT TO DATABASE
////////////////////////////////////////

exports.getRestaurant = async (req, res) => {
  try {
    const list = await Restaurant.find({});
    const randomInd = Math.floor(Math.random() * (list.length - 1));
    res.status(200).json(list[randomInd]);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Something went wrong with RESTAURANT RETRIEVAL",
        error,
      });
  }
};
