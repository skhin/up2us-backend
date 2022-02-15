const restaurantData = require("./data/restaurant");
const connectDB = require("./config/db");
const Restaurant = require("./model/Restaurant");

connectDB();

const importData = (async) => {
  // delete everything in database to insert many items
  try {
    await Restaurant.deleteMany({});

    await Restaurant.insertMany(restaurantData);
    console.log("Restaurant data import DONE");
    process.exit();
  } catch (error) {
    console.error("Error with improting Restaurant Data" + error);
    process.exit(1);
  }
};

// to run the function immediately when the file is called
importData();
